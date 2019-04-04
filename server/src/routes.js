const router = require("express").Router();
const { version } = require("../package.json");

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API",
    data: {
      version: `${version}`
    }
  });
});

router.use("/admins", require("./api/admins").router);
router.use("/users", require("./api/users").router);
router.use("/executors", require("./api/executors").router);
router.use("/orders", require("./api/orders").router);

module.exports = router;
