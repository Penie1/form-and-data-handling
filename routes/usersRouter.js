const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersStorage = require("../storages/usersStorage");
const userRouter = Router();

userRouter.get("/", usersController.getAllUsers);
userRouter.get("/:id/user", usersController.getUserById);
userRouter.get("/create", usersController.getCreateUserForm);
userRouter.post("/create", usersController.createUsers);
userRouter.get("/:id/update", usersController.getUpdateUserForm);
userRouter.post("/:id/update", usersController.updateUser);
userRouter.post("/:id/delete", usersController.deleteUser);
module.exports = userRouter;
