module.exports = (app) => {
    const router = require("express").Router();
    const chatRoute = require("../controller/chatController");
  
    router.get("/", chatRoute.index);
    router.post('/ajax_listing', chatRoute.ajax_listing);
  
    app.use("/chat", router);
  };
  