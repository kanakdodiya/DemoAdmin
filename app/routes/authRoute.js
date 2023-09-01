// const express = require("express");
// const router = express.Router();

// const authController = require("../controller/authController");

// router.get("/", authController.index);
// router.get("/login", authController.index);
// router.post("/login-action", authController.login_action);
// router.get("/register", authController.register);
// router.post("/register", authController.register_action);
// router.get("/forgot-password", authController.forgotPassword);

module.exports = (app) => {
  const router = require("express").Router();
  const authController = require("../controller/authController");

  router.get("/", authController.index);
  router.get("/login", authController.index);
  router.post("/login-action", authController.login_action);
  router.get("/register", authController.register);
  router.post("/register", authController.register_action);
  router.get("/forgot-password", authController.forgotPassword);
  router.post("/forgot-password-action", authController.forgotPassword_action);
  router.get("/reset-password/:token", authController.reset_password);
  router.post("/reset-password-action", authController.reset_password_action);
  router.get("/logout", authController.logout);


  app.use("/",router)
};
