const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.get("/", authController.login);
router.get("/login", authController.login);
router.get("/register", authController.register);
router.get("/forgot-password", authController.forgotPassword);

module.exports = router;