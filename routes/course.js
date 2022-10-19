const express = require("express");
const router = express.Router();

let courseList = [
  { id: 1, tech: "javascript" },
  { id: 2, tech: "react" },
  { id: 3, tech: "nodejs" },
];

// Post API

router.post("/", (req, res) => {
  const course = {
    id: courseList.length + 1,
    tech: req.body.tech,
  };
  courseList.push(course);
  res.send(course);
});

// GET API

router.use("/", (req, res) => {
  res.send(courseList);
  console.log("Request Type:", req.method);
});

module.exports = router;
