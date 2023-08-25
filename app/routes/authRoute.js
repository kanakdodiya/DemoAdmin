const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.get("/", authController.index);
// router.post("/login", authController.loginLoad);
router.post("/login", authController.login_action);
router.get("/register", authController.register);
router.post("/register", authController.register_action);
router.get("/forgot-password", authController.forgotPassword);

module.exports = router;