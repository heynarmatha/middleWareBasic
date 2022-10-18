const express = require("express");
const logger = require("./logger");
const auth = require("./auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // access a static file in browser

let courseList = [
  { id: 1, tech: "javascript" },
  { id: 2, tech: "react" },
  { id: 3, tech: "nodejs" },
];

app.use(logger);
app.use(auth);

// Post API

app.post("/postcourse", (req, res) => {
  const course = {
    id: courseList.length + 1,
    tech: req.body.tech,
  };
  courseList.push(course);
  res.send(course);
});

// GET API
app.use("/postcourse", (req, res) => {
  res.send(courseList);
  console.log("Request Type:", req.method);
});

app.listen(3000);
