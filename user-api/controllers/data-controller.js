var jwt = require('jsonwebtoken');
var { requestPromise } = require('../helper/helper-functions');

// GET ALL [/data]
const index = (req, res) => {
    jwt.verify(req.token, 'secretKey', async (err, authData) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            let json = await requestPromise(process.env.DATA_API_URL);
            res.json(json);
        }
    })
}




module.exports = { index }
