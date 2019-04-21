const adminService = require("./admins.services");

module.exports.registerAdmin = (req, res, next) => {
  adminService
    .register(req.body)
    .then(admin => {
      res.json(admin);
    })
    .catch(err => next(err));
};
module.exports.loadAdmin = (req, res, next) => {
  adminService
    .loadAdmin(req.user)
    .then(admin => {
      res.json(admin);
    })
    .catch(err => next(err));
};
module.exports.signinAdmin = (req, res, next) => {
  adminService
    .authenticate(req.body)
    .then(admin => {
      res.json(admin);
    })
    .catch(err => next(err));
};
