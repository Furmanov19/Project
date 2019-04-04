const httpStatus = require("http-status");
const adminService = require("./admins.services");

module.exports.registerAdmin = (req, res, next) => {
  adminService
      .register(req.body)
      .then(() => {
        res.status(httpStatus.CREATED).json("Created");
      })
      .catch(err => next(err));
  };
  module.exports.signinAdmin = (req, res, next) => {
    adminService
      .authenticate(req.body)
      .then(admin => {
        admin
          ? res.json(admin)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Username or password is incorrect" });
      })
      .catch(err => next(err));
  };