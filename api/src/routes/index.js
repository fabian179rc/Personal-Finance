const { Router } = require("express");
const router = Router();
const userRoute = require("./user");

router.use("/user", userRoute);

module.exports = router;
