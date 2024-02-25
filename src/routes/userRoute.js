const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/userController");
const auth = require('../utils/tokenUtil');

const authenticate = [auth.verifyToken];

userRouter.post('/login', userController.login);
userRouter.post('/signUp', userController.signup);
userRouter.patch('/:id', userController.updateUser);
userRouter.get('/logout', userController.logout);
userRouter.get('/findMany', userController.getUsers)
userRouter.get('/auth/:id', userController.getUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/forget-password', userController.forgetPassword);
userRouter.get('/:token/verify/:email', userController.verifyToken);
userRouter.patch('/:email/reset-password', userController.resetPassword);


module.exports = userRouter