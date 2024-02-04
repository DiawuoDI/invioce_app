const prisma = require('../utils/prismaUtil');
const passwordUtil = require('../utils/passwordUtil');
const HttpException = require('../utils/http-exception');
const tokenUtil = require('../utils/tokenUtil');
const moment = require('moment');

//creating a new user by signing up request
exports.signup = async(req,res, next) => {
    try {
        const data =req.body
    const user = await prisma.user.create({data});
    const token = tokenUtil.signToken(user.id);

    // Handle any errors that might occur during user creation
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: user,
        }
    });
      } catch (error) {
         next(new HttpException(422, error.message));
  }
};

//=== update an existing user details
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException( "User not found!");
    } else {
      if (data.password) await passwordUtil.hashPassword(data.password);
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data,
      });
      res.status(200).json({
        message: "User Updated",
        updateUser,
      });
    }
  } catch (error) {
    next(
      new HttpException(error.message)
    );
  }
};

// logging in a user who is already in the database
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailValidated = await validateEmail(email);
    const user = await validateConfirmed(emailValidated?.email);
    const valid = await validatePwd(password, user?.password || "");

    if (valid === true || valid === "true") {
      const token = tokenUtil.signToken(user);
      res.header("Authorization", token);
      res.status(201).json({
        status: "success",
        token,
        userId: user.id,
      });
    }
  } catch (error) {
    next(
      new HttpException(error.message)
    );
  }
};

// logging out a user endpoint
exports.logout = async (req, res, next) => {
  try {
    const loggedout = "loggedout";
    tokenUtil.setInvalidToken(loggedout);
    return res.status(201).json({
      status: "success",
      message: "logged out",
    });
  } catch (error) {
    next(new HttpException, error.message);
  }
};

// authenticating an existing user by Id
exports.getAuthUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findAuthUser(id);

    return res.status(200).json({ user });
  } catch (error) {
    next(new HttpException, error.message);
  }
};

//..Endpoint to authenticate all users in the database
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.getUsers({});
    res.status(200).json({
      users,
    });
  } catch (error) {
    next(new HttpException(404, error.message));
  }
};

//...delete user controller..
exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(new HttpException, error.message);
  }
};

// forget password controllers
exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exists = await checkUserExists(email);
    if (!exists) {
      throw new HttpException( "Invalid email");
    }
    {
      const expiration = moment().add(5, "minutes");
      const data = {
        code: generateVrificationToken(),
        expiration,
      };
      const user = await prisma.user.update({
        where: {
          email: exists.email,
        },
        data,
      });
      res.status(401).json({
        status: "succesful",
        message: "Email sent",
        user,
      });
    }
  } catch (error) {
    next(new HttpException, error.message);
  }
};
// verifyToken controller
exports.verifyToken = async (req, res, next) => {
  const { token, email } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            code: token,
            email,
            expiration: {
              gte: moment().format(),
            },
          },
        ],
      },
    });
    if (!user) {
      throw new HttpException( "Invalid token");
    } else {
      res.status(200).json({
        status: "Success",
        message: "User verified",
        user,
      });
    }
  } catch (error) {
    next(new HttpException, error.message);
  }
};
// reset password controller
exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.params;
    let { password } = req.body;
    password = await passwordUtil.hashPassword(password);

    const exists = await checkUserExists(email);

    if (!exists) {
      throw new HttpException( "User not found");
    } else {
      const expiration = moment().add(2, "minutes");
      const data = {
        code: "1234",
        password,
        expiration,
      };
      const user = await prisma.user.update({
        where: {
          email,
        },
        data,
      });
      res.status(201).json({
        status: "success",
        user,
      });
    }
  } catch (error) {
    next(new HttpException, error.message);
  }
};