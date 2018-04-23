var express = require('express');
var router = express.Router();
var transaction = require('../controllers/transaction-controller');


/* GET users listing. */
router.get('/', transaction.index);
router.post('/test', transaction.test);
router.get('/:id', transaction.getById);
router.post('/', transaction.create);
router.put('/:id', transaction.update);


module.exports = router;
