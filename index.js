const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
