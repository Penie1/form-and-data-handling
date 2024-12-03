const usersStorage = require("../storages/usersStorage");

exports.getAllUsers = (req, res) => {
  res.render("index", { users: usersStorage.getUsers() });
};
exports.getCreateUserForm = (req, res) => {
  res.render("createUser");
};
exports.createUsers = (req, res) => {
  const { firstName, lastName } = req.body;
  usersStorage.addUsers({ firstName, lastName });
  res.redirect("/");
};
