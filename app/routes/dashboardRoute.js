// const express = require("express");
// const router = express.Router();

// const dashboardRoute = require("../controller/dashboardController");

// router.get("/", dashboardRoute.index);

// module.exports = router;

module.exports = (app) => {
  const router = require("express").Router();
  const dashboardRoute = require("../controller/dashboardController");

  router.get("/", dashboardRoute.index);

  app.use("/dashboard", router);
};
