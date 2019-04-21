const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./executors.controllers`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.post("/register", controller.registerExecutor);
router.post("/register/confirm", controller.confirmExecutor);
router.post("/:_id/comments", permit(Role.User), controller.postComment);
router.get("/current", permit(Role.Executor), controller.loadExecutor);
router.post("/signin", controller.signinExecutor);
router.put("/block/:_id", permit(Role.Admin), controller.blockExecutor);
router.put("/unblock/:_id", permit(Role.Admin), controller.unblockExecutor);
router.put("/edit/:_id", permit(Role.Executor), controller.editExecutor);
router.get("/", controller.getExecutors);
router.get("/:_id/comments", controller.getExecutorComments);

module.exports = router;
