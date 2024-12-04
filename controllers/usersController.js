const usersStorage = require("../storages/usersStorage");
const { body, validationResult, param } = require("express-validator");
const alphError = "must only contains letters.";
const lengthError = "must be between 1 to 10 characters.";
const validateParam = [param("id").notEmpty().isNumeric()];
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
exports.getUserById = [
  validateParam,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next();
    }
    const { id } = req.params;

    if (!usersStorage.getUser(id))
      return res.status(400).send(`<h1>No user was found with ID ${id}.</h1>`);

    res.render("index", { id: id, users: [usersStorage.getUser(id)] });
  },
];
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
