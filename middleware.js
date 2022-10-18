const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method); // get method
  next();
});

app.use("/date/:year/:month", (req, res, next) => {
  console.log("checking year and month:", req.method); // get method
  next();
});

// output

// Time: 1666096918234
// Request Type: GET

app.use(
  "/month/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

//output

// Request URL: /month/11
// Request Type: GET

app.get(
  "/userinfo/:id",
  (req, res, next) => {
    console.log("ID:", req.params.id);
    next();
  },
  (req, res, next) => {
    // res.send("user Info");
    res.send(req.params);
  }
);

app.listen(3000);
