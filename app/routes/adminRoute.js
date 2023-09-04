module.exports = (app) => {
    const router = require("express").Router();
    const adminController = require("../controller/adminController");
  const authController = require("../controller/authController");

  
    router.get("/", adminController.index);
    router.post("/ajax_listing", adminController.ajax_listing);
    router.get("/add", adminController.add);
    router.get("/edit/:iAuthId", adminController.edit);
    router.get("/delete/:iAuthId", adminController.delete);

    router.get("/test",adminController.test);
  
    app.use("/admin", router);
  };
  