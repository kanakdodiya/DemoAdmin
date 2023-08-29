module.exports = (app) => {
    const router = require("express").Router();
    const usersController = require('../controller/usersController');
  
    router.get('/', usersController.index);
    router.get('/add-user', usersController.addUser);
    router.post('/add-action', usersController.addAction);
    router.get('/edit-user/:id', usersController.editUser);
    router.get('/delete-user/:id', usersController.deleteUser);
  
  
    app.use("/users",router)
  };