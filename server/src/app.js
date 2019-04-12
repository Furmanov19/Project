var express = require("express");
var path = require("path");
var logger = require("morgan");

var passport = require("./config/passport");
var initializeDb = require("./config/mongodb");
var router = require("./routes");

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

initializeDb(() => {
  app.use(passport.initialize());
  passport.jwtStrategy();
  passport.googleStrategy();

  app.use("/api/", router);

  app.get("*", function(req, res, next) {
    let err = new Error("Page Not Found");
    err.statusCode = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });
});

module.exports = app;
