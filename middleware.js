const express = require("express");
const app = express();
const route = express.Router();

// Custom middleware (applied on all routes)
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

//custom middleware  (applied on routes starting with /user)
app.use("/user/:id", (req, res, next) => {
  res.send("user");
  console.log("Request Type:", req.method); // get method
  next();
});

//custom middleware  (applied on routes starting with /date)
app.use("/userdob/:year/:month", (req, res, next) => {
  res.send("userdob");
  console.log("checking year and month:", req.method); // get method
  next();
});

// output

// Time: 1666096918234
// Request Type: GET

app.use(
  "/month/:id",
  (req, res, next) => {
    res.send("first");
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    /* res.send("second");*/ // error will come Cannot set headers after they are sent to the client
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
    console.log("login ID", req.params.id);
    next();
  },
  (req, res, next) => {
    console.log("auth");
    next();
  },
  (req, res) => {
    res.send(req.params);
    console.log("welcome");
  }
);

app.get(
  "/routing/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // send a regular response
    console.log("ss");
    res.send("regular");
  }
);

app.get("/routing/:id", (req, res, next) => {
  res.send("special");
  console.log("ss");
});
app.listen(3000);
