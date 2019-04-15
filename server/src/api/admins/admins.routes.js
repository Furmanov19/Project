const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./admins.controllers`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.get("/current",permit(Role.Admin),controller.loadAdmin);
router.post("/signin", controller.signinAdmin);
router.post("/register",  controller.registerAdmin);
router.get("/only-admin", permit(Role.Admin), (req, res, next) => {
  res.status(httpStatus.OK).json("GET /only-admin");
});


module.exports = router;