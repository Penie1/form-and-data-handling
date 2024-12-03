const usersStorage = require("../storages/usersStorage");

exports.getAllUsers = (req, res) => {
  res.render("index", { users: usersStorage.getUsers() });
};
