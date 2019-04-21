const httpStatus = require("http-status");
const executorService = require("./executors.services");

module.exports.registerExecutor = (req, res, next) => {
  executorService
    .register(req.body)
    .then(executor => {
      res.status(httpStatus.OK).json(executor);
    })
    .catch(err => next(err));
};
module.exports.confirmExecutor = (req, res, next) => {
  executorService
    .confirm(req.body)
    .then(token => {
      res.status(httpStatus.OK).json(token);
    })
    .catch(err => next(err));
};
module.exports.loadExecutor = (req, res, next) => {
  executorService
    .loadExecutor(req.user)
    .then(executor => {
      res.status(httpStatus.OK).json(executor);
    })
    .catch(err => next(err));
};
module.exports.signinExecutor = (req, res, next) => {
  executorService
    .authenticate(req.body)
    .then(executor => {
      res.status(httpStatus.OK).json(executor);
    })
    .catch(err => next(err));
};
module.exports.getExecutors = (req, res, next) => {
  executorService
    .get(req.query)
    .then(executors => {
      executors
        ? res.status(httpStatus.OK).json(executors)
        : res.status(httpStatus.UNAUTHORIZED).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.blockExecutor = (req, res, next) => {
  executorService
    .blockExecutor(req.params._id, req.body)
    .then(executor => {
      executor ? res.status(httpStatus.OK).json(executor) : res.status(httpStatus.BAD_REQUEST).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.unblockExecutor = (req, res, next) => {
  executorService
    .unblockExecutor(req.params._id)
    .then(executor => {
      executor ? res.status(httpStatus.OK).json(executor) : res.status(httpStatus.BAD_REQUEST).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.editExecutor = (req, res, next) => {
  executorService
    .editExecutor(req.params._id, req.body)
    .then(executor => {
      executor ? res.status(httpStatus.OK).json(executor) : res.status(httpStatus.BAD_REQUEST).json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.postComment = (req, res, next) => {
  executorService
    .postComment(req.params._id, req.body)
    .then(executor => {
      executor ? res.status(httpStatus.OK).json(executor) : res.json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.getExecutorById = (req, res, next) => {
  executorService
    .getById(req.params._id)
    .then(executor => {
      executor
        ? res.status(httpStatus.OK).json(executor)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: "Error" });
    })
    .catch(err => next(err));
};
module.exports.getExecutorComments = (req, res, next) => {
  executorService
    .getExecutorComments(req.params._id,req.query)
    .then(data => {
      res.status(httpStatus.CREATED).json(data);
    })
    .catch(err => next(err));
};
