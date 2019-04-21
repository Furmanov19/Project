const httpStatus = require("http-status");
const userService = require("./users.services");

module.exports.registerUser = (req, res, next) => {
  userService
    .register(req.body)
    .then(user => {
      res.status(httpStatus.OK).json(user);
    })
    .catch(err => next(err));
};
module.exports.confirmUser = (req, res, next) => {
  userService
    .confirm(req.body)
    .then(data => {
      res.status(httpStatus.OK).json(data);
    })
    .catch(err => next(err));
};
module.exports.loadUser = (req, res, next) => {
  userService
    .loadUser(req.user)
    .then(user => {
      res.status(httpStatus.OK).json(user);
    })
    .catch(err => next(err));
};
module.exports.signinUser = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then(user => {
      res.status(httpStatus.OK).json(user);
    })
    .catch(err => next(err));
};
module.exports.getUsers = (req, res, next) => {
  userService
    .get(req.query)
    .then(users => {
      users
        ? res.status(httpStatus.OK).json(users)
        : res.status(httpStatus.BAD_REQUEST).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.blockUser = (req, res, next) => {
  userService
    .blockUser(req.params._id, req.body)
    .then(user => {
      user ? res.status(httpStatus.OK).json(user) : res.status(httpStatus.BAD_REQUEST).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.unblockUser = (req, res, next) => {
  userService
    .unblockUser(req.params._id)
    .then(user => {
      user ? res.status(httpStatus.OK).json(user) : res.status(httpStatus.BAD_REQUEST).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.editUser = (req, res, next) => {
  userService
    .editUser(req.params._id, req.body)
    .then(user => {
      user ? res.status(httpStatus.OK).json(user) : res.status(httpStatus.BAD_REQUEST).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.authSocialNetwork = (req, res, next) => {
  userService
    .authSocialNetwork(req.user)
    .then((data) => res.status(httpStatus.OK).json(data))
    .catch(err => next(err));
};
