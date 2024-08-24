const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();
const authController = require('./../controllers/authController');

router.post('/signUp', authController.signup);
router.post('/login',authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:_id')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
