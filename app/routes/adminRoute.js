module.exports = (app) => {
    const router = require("express").Router();
    const adminController = require("../controller/adminController");
  const authController = require("../controller/authController");

  
    router.get("/", adminController.index);
    router.get("/add", adminController.add);
    router.get("/edit/:iAuthId", adminController.edit);
    router.get("/delete/:iAuthId", adminController.delete);
  
    app.use("/admin", router);
  };
  