const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./users.controllers`);
const permit = require("../../middleware/permission");
const { authenticateGoogle } = require("../../config/passport");

const Role = require("../../enums/roles.enum");

router.post("/register", controller.registerUser);
router.post("/register/confirm", controller.confirmUser);
router.get("/current", permit(Role.User), controller.loadUser);
router.post("/signin", controller.signinUser);
router.put("/block/:_id",permit(Role.Admin),controller.blockUser);
router.put("/unblock/:_id",permit(Role.Admin), controller.unblockUser);
router.put("/edit/:_id", controller.editUser);
router.get("/", controller.getUsers);
router.post(
  "/google",
  authenticateGoogle(),
  controller.authSocialNetwork
);

module.exports = router;
