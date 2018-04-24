var express = require('express');
var router = express.Router();
var transaction = require('../controllers/transaction-controller');


/* GET users listing. */
router.get('/', transaction.index);
router.get('/fraud', transaction.getFraudData);
router.get('/byid/:id', transaction.getById);
// create fake data in DB
router.get('/insertdata', transaction.createFakeData);

router.post('/', transaction.create);
router.put('/:id', transaction.update);


module.exports = router;
