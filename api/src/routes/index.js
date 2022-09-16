const { Router } = require("express");
const router = Router();
const userRoute = require("./user");
const operationRoute = require("./operation");

router.use("/user", userRoute);
router.use("/operation", operationRoute);

module.exports = router;
