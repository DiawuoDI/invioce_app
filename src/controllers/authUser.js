// const crypto = require("crypto");
// const prisma = require("../utils/prismaUtil");
// const HttpException = require("../utils/http-exception");
// // to check  an existing user
// const checkUserExists = async (email) => {
//   return await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });
// };
// // to save a user
// const saveUser = async (data) => {
//   return await prisma.user.create({
//     data,
//   });
// };
// //  to validate Email
// const validateEmail = async (email) => {
//   const emailVal = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (emailVal === null || emailVal === "null") {
//     throw new HttpException("Incorrect email!");
//   }
//   return emailVal;
// };
// //   to confirm email validation
// const validateConfirmed = async (email) => {
//   const validatedEmail = await prisma.user.findFirst({
//     where: {
//       OR: [
//         {
//           email,
//           confirmed: true,
//         },
//       ],
//     },
//   });
//   if (validatedEmail === null || validatedEmail === "null") {
//     throw new HttpException("User not Confirmed Contact your Admin!");
//   }
//   return validatedEmail;
// };
// //  to validate password
// const validatePwd = async (userpwd, syspwd) => {
//   const validPwd = await passwordUtil.comparePassword(userpwd, syspwd);

//   if (validPwd === false || validPwd === "false") {
//     throw new HttpException("Invalid credentials,please enter the correct credentials");
//   } else {
//     return validPwd;
//   }
// };
// //  to  find authenticated user
// const findAuthUser = async (id) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       fullname: true,
//       email: true,
//     },
//   });

//   if (!user) {
    
//     new HttpException(error.message);
//   } else {
//     return user;
//   }
// };

// // generate verification code
// const generateVrificationToken = () => {
//   const code = crypto.randomBytes(64).toString("hex");
//   return code;
// };
// // to get all users
// const getUsers = async () => {
//   return await prisma.user.findMany({
//     where: {
//       location: location,
//     },
//     include: {
//       cities: true,
//     },
//   });
// };
// module.exports = {
//   checkUserExists,
//   saveUser,
//   validateEmail,
//   validateConfirmed,
//   validatePwd,
//   findAuthUser,
//   generateVrificationToken,
//   getUsers,
// };