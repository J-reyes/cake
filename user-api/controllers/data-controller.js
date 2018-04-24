var jwt = require('jsonwebtoken');
var { requestPromise } = require('../helper/helper-functions');
// var request = require('request');

// GET ALL [/data]
const index = async (req, res) => {
    let json = await requestPromise(process.env.DATA_API_URL);
    res.json(json);


}


// request("http://localhost:3000/transactions/fraud", function (err, response, body) {
//     let json = JSON.parse(body);
//     console.log(json);
//     res.json(json);
// });

module.exports = { index }