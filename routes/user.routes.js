const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const check = require('../middleware/auth');

router.get('/user/:id', check.auth, userController.getUser);
router.post('/user/', userController.createUser);
router.post('/login', userController.Login);

module.exports = router;