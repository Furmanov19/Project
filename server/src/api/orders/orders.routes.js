const router = require("express").Router();
const permit = require("../../middleware/permission");
const controller = require(`./orders.controllers`);
const Role =require('../../enums/roles.enum');

router.post("/create",permit(Role.User), controller.createOrder);
router.get("/", permit([Role.User,Role.Executor]), controller.getOrders);//переделать  под юзеров и компании
router.get("/:id", permit([Role.User,Role.Executor]), controller.getOrder);
router.delete("/:id", permit(Role.User), controller.deleteUserOrder);
router.put("/:id", permit([Role.User,Role.Executor]), controller.updateOrderById);
module.exports = router;
