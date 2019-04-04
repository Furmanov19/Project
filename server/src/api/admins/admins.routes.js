const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./admins.controllers`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");


router.post("/signin", controller.signinAdmin);
router.post("/register", permit(Role.Admin), controller.registerAdmin);
router.get("/only-admin", permit(Role.Admin), (req, res, next) => {
  res.status(httpStatus.OK).json("GET /only-admin");
});


module.exports = router;