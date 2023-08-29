module.exports = (app) => {
    const router = require("express").Router();
    const systemEmailController = require('../controller/systemEmailController');
  
    router.get('/', systemEmailController.index);
    router.get('/add', systemEmailController.add);
    // router.get('/add-user', usersController.addUser);
    // router.post('/add-action', usersController.addAction);
    // router.get('/edit-user/:id', usersController.editUser);
    // router.get('/delete-user/:id', usersController.deleteUser);
  
  
    app.use("/system-email",router)
  };