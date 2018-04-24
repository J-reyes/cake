var express = require('express');
var router = express.Router();
var transaction = require('../controllers/transaction-controller');


/* GET users listing. */
router.get('/', transaction.index);
router.get('/fraud', transaction.getFraudData);
router.get('/:id', transaction.getById);
router.post('/', transaction.create);
router.put('/:id', transaction.update);


module.exports = router;
