const router = require("express").Router();
const permit = require("../../middleware/permission");
const controller = require(`./orders.controllers`);
const Role = require("../../enums/roles.enum");

router.post("/create", controller.createOrder);
router.get("/", permit([Role.User, Role.Executor]), controller.getOrders);
router.delete("/:id", permit(Role.User), controller.deleteUserOrder);
router.put("/", permit(Role.Executor), controller.updateOrderById);

module.exports = router;
