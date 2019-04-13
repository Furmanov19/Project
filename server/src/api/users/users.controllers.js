const httpStatus = require("http-status");
const userService = require("./users.services");

module.exports.registerUser = (req, res, next) => {
  userService
    .register(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(err =>next(err));
};
module.exports.confirmUser = (req, res, next) => {
  userService
    .confirm(req.body)
    .then((token) => {//not only token responsed from service
      res.json(token);
    })
    .catch(err =>next(err));
};
module.exports.loadUser = (req, res, next) => {
  userService
    .loadUser(req.user)
    .then((user)=>{
      res.json(user);
    })
    .catch(err => next(err));
};
module.exports.signinUser = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err));
};
module.exports.getUsers = (req, res, next) => {
  userService
      .get(req.query)
      .then(users => {
        users
          ? res.json(users)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Error" });
      })
      .catch(err => next(err));
};
module.exports.blockUser = (req, res, next) => {
  userService
      .blockUser(req.params._id, req.body)
      .then(user => {
        user
          ? res.json(user)
          : res
              .json({ message: "Error" });
      })
      .catch(err => next(err));
};
module.exports.unblockUser = (req, res, next) => {
  userService
      .unblockUser(req.params._id)
      .then(user => {
        user
          ? res.json(user)
          : res
              .json({ message: "Error" });
      })
      .catch(err => next(err));
};




module.exports.getUserById = (req, res, next) => {
  userService
      .getById(req.params._id)
      .then(user => {
        user
          ? res.json(user)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Id is incorrect" });
      })
      .catch(err => next(err));
  };
  module.exports.updateUserById = (req, res, next) => {
    userService
      .updateById(req.params._id,req.body)
      .then(user => {
        user
          ? res.json(user)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Id is incorrect" });
      })
      .catch(err => next(err));
  };
 







  module.exports.authSocialNetwork = (req, res, next) => {
    userService
    .authSocialNetwork(req.user)
    .then(() => res.status(httpStatus.OK).json("ok"))
    .catch(err => next(err));
  };
  module.exports.deleteUserById = (req, res, next) => {
    userService
      .deleteById(req.params._id)
      .then(() => {
        res.json("Deleted");
      })
      .catch(err => next(err));
  };