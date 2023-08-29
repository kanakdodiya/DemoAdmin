module.exports = (app) => {
  const router = require("express").Router();
  const systemEmailController = require('../controller/systemEmailController');

  router.get('/', systemEmailController.index);
  // router.get("/", systemEmailController.ajax_listing);
  router.get('/add', systemEmailController.add);
  router.post('/add_action', systemEmailController.add_action);
  router.get("/edit/:iSystemEmailId", systemEmailController.edit);


  

  app.use("/system-email", router);
};