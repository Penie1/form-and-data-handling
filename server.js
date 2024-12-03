const express = require("express");
const usersRouter = require("./routes/usersRouter");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
