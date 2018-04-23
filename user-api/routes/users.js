var express = require('express');
var router = express.Router();

var userController = require('../controllers/user-controller');
var authenticate = require('../controllers/auth');

router.get('/',  userController.index);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;