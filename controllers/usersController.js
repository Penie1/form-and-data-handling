const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");
const alphError = "must only contains letters.";
const lengthError = "must be between 1 to 10 characters.";
const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphError}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthError}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphError}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthError}`),
];
exports.getAllUsers = (req, res) => {
  res.render("index", { users: usersStorage.getUsers() });
};
exports.getCreateUserForm = (req, res) => {
  res.render("createUser");
};
exports.createUsers = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    const { firstName, lastName } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        firstName: firstName,
        lastName: lastName,
        errors: errors.array(),
      });
    }

    usersStorage.addUsers({ firstName, lastName });
    res.redirect("/");
  },
];
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
