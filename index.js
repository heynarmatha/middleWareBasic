//express
const express = require("express");
const app = express();

//debug
const debug = require("debug")("app:startup");

//build in middleware
const morgan = require("morgan");
const helmet = require("helmet");

//custom middleware
const logger = require("./logger");
const auth = require("./auth");

// route for courses
const router = require("./routes/course");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // access a static file in browser

app.use(helmet());
app.use(logger);

app.use(auth);

app.use("/postcourse", router);

//Enviroment variable

debug(`Enviroment NODE_ENV : ${process.env.NODE_ENV}`); //Enviroment NODE_ENV : undefined
debug(`app:${app.get("env")}`); //app:development

if (app.get("env") === "development") {
  app.use(morgan("tiny")); // GET /postcourse 200 79 - 5.984 ms
  debug("Morgam active");
}

app.listen(3000);
