const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./users.controllers`);
const permit = require("../../middleware/permission");
const {
  authenticateGoogle
} = require("../../config/passport");

const Role = require("../../enums/roles.enum");


router.post("/register", controller.registerUser);
router.post("/register/confirm", controller.confirmUser);
router.get("/current",permit(Role.User),controller.loadUser);
router.post("/signin", controller.signinUser);



router.get("/google", authenticateGoogle());
router.get(
  "/google/redirect",
  authenticateGoogle(),
  controller.authSocialNetwork
);

//router.get("/:_id", /*permit(Role.User),*/ controller.getUserById);
router.put("/:_id", /*permit(Role.User),*/ controller.updateUserById);
router.delete("/:_id", /*permit(Role.User),*/ controller.deleteUserById);
router.get("/only-user", permit(Role.User), (req, res, next) => {
  res.status(httpStatus.OK).json("GET /only-user");
});



module.exports = router;