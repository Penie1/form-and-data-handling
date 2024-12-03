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
exports.getUpdateUserForm = (req, res) => {
  const { id } = req.params;
  const user = usersStorage.storage[id];
  res.render("updateUser", { user: user });
};
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  usersStorage.updateUser(id, { firstName, lastName });
  res.redirect("/");
};
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  usersStorage.deleteUser(id);
  res.redirect("/");
};
