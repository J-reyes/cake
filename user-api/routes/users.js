var express = require('express');
var router = express.Router();

var userController = require('../controllers/user-controller');
var auth = require('../controllers/auth');

router.get('/', auth.verifyToken, userController.index);
router.get('/:id', auth.verifyToken, userController.getById);
router.post('/', auth.verifyToken, userController.create);
router.post('/login', userController.login);

module.exports = router;