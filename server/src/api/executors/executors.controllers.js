const httpStatus = require("http-status");
const executorService = require("./executors.services");


module.exports.registerExecutor = (req, res, next) => {
  executorService
    .register(req.body)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};
module.exports.confirmExecutor = (req, res, next) => {
  executorService
    .confirm(req.body)
    .then((executor) => {
      executor
      ? res.json(executor)
      :res.json("Not Confirmed");
    })
    .catch(err => next(err));
};



module.exports.getExecutors = (req, res, next) => {
  executorService
      .get()
      .then(executors => {
        executors
          ? res.json(executors)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Error" });
      })
      .catch(err => next(err));
  };
module.exports.getExecutorById = (req, res, next) => {
  executorService
      .getById(req.params._id)
      .then(executor => {
        executor
          ? res.json(executor)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Id is incorrect" });
      })
      .catch(err => next(err));
  };
  
  module.exports.updateExecutorById = (req, res, next) => {
    executorService
      .updateById(req.params._id,req.body)
      .then(executor => {
        executor
          ? res.json(executor)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Id is incorrect" });
      })
      .catch(err => next(err));
  };
  module.exports.deleteExecutorById = (req, res, next) => {
    executorService
      .deleteById(req.params._id)
      .then(() => {
        res.json("Deleted");
      })
      .catch(err => next(err));
  };
  module.exports.signinExecutor = (req, res, next) => {
    executorService
      .authenticate(req.body)
      .then(executor => {
        executor
          ? res.json(executor)
          : res
              .status(httpStatus.UNAUTHORIZED)
              .json({ message: "Username or password is incorrect" });
      })
      .catch(err => next(err));
  };
  
  module.exports.postExecutorRate = (req, res, next) => {
    executorService
      .setExecutorRate(req.body,req.params.id)
      .then(() => {
        res.status(httpStatus.CREATED).json("Created");
      })
      .catch(err => next(err));
  };
  module.exports.getExecutorRate = (req, res, next) => {
    executorService
      .takeExecutorRate(req.params.id)
      .then((data) => {
        res.status(httpStatus.CREATED).json(data);
      })
      .catch(err => next(err));
  };

  module.exports.postExecutorComment = (req, res, next) => {
    executorService
      .setExecutorComment(req.body,req.params.id)
      .then(() => {
        res.status(httpStatus.CREATED).json("Created");
      })
      .catch(err => next(err));
  };
  module.exports.getExecutorComments = (req, res, next) => {
    executorService
      .takeExecutorComments(req.params.id)
      .then((data) => {
        res.status(httpStatus.CREATED).json(data);
      })
      .catch(err => next(err));
  };
  