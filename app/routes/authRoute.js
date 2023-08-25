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

  app.use("/",router)
};
