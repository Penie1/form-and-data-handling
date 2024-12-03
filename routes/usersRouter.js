const { Router } = require("express");
const usersController = require("../controllers/usersController");
const userRouter = Router();

userRouter.get("/", usersController.getAllUsers);
userRouter.get("/create", usersController.getCreateUserForm);
userRouter.post("/create", usersController.createUsers);
module.exports = userRouter;
