const express = require("express");
const logger = require("./logger");
const auth = require("./auth");
const app = express();

app.use(logger);

app.use(auth);

app.get("/", (req, res) => {
  console.log("Go out");
  res.send("Hello");
});

app.listen(3000);
