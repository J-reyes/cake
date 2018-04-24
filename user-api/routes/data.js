var express = require('express');
var router = express.Router();

var dataController = require('../controllers/data-controller');
var auth = require('../controllers/auth');

router.get('/', dataController.index);


module.exports = router;