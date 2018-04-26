var express = require('express');
var router = express.Router();
var impression = require('../controllers/impression-controller');


/* GET users listing. */
router.get('/', impression.index);
router.get('/fraud', impression.getFraudData);
router.get('/byid/:id', impression.getById);
// create fake data in DB
router.get('/insertdata', impression.createFakeData);

router.post('/', impression.create);
router.put('/:id', impression.update);


module.exports = router;
