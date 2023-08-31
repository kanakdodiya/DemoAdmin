module.exports = (app) => {
  const router = require("express").Router();
  const systemEmailController = require('../controller/systemEmailController');

  router.get('/', systemEmailController.index);
  router.post("/ajax_listing", systemEmailController.ajax_listing);

  router.get('/add', systemEmailController.add);
  router.post('/add_action', systemEmailController.add_action);
  router.get("/edit/:iSystemEmailId", systemEmailController.edit);
  router.get('/delete-email/:id', systemEmailController.delete);





  app.use("/system-email", router);
};