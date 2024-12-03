const { Router } = require("express");
const usersController = require("../controllers/usersController");
const userRouter = Router();

userRouter.get("/", usersController.getAllUsers);

module.exports = userRouter;
