const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./executors.controllers`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.post("/register", controller.registerExecutor);
router.post("/register/confirm", controller.confirmExecutor);
router.get("/current",permit(),controller.loadExecutor);
router.post("/signin", controller.signinExecutor);
router.get("/", controller.getExecutors);

router.post("/rate/:id",permit(Role.User), controller.postExecutorRate);
router.get("/rate/:id",permit(Role.User), controller.getExecutorRate);
router.post("/comments/:id",permit(Role.User), controller.postExecutorComment);
router.get("/comments/:id",permit(Role.User), controller.getExecutorComments);
router.put("/:_id", /*permit(Role.Executer),*/ controller.updateExecutorById);
router.delete("/:_id", /*permit(Role.Executer),*/ controller.deleteExecutorById);
router.get("/only-executor", permit(Role.Executor), (req, res, next) => {
  res.status(httpStatus.OK).json("GET /only-executer");
});


module.exports = router;

