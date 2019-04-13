const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./executors.controllers`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.post("/register", controller.registerExecutor);
router.post("/register/confirm", controller.confirmExecutor);
router.get("/current",permit(Role.Executor),controller.loadExecutor);
router.post("/signin", controller.signinExecutor);
router.put("/block/:_id",permit(Role.Admin), controller.blockExecutor);
router.put("/unblock/:_id",permit(Role.Admin), controller.unblockExecutor);
router.get("/", controller.getExecutors);


router.post("/comments/:id",permit(Role.User), controller.postExecutorComment);
router.get("/comments/:id",permit(Role.User), controller.getExecutorComments);
router.put("/:_id", /*permit(Role.Executer),*/ controller.updateExecutorById);
router.delete("/:_id", /*permit(Role.Executer),*/ controller.deleteExecutorById);


module.exports = router;

