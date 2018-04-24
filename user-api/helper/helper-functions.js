const request = require('request');

// Request Library Promise Wrapper
const requestPromise = options => new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
        if (err != null) {
            return reject(err);
        } else {
            resolve(JSON.parse(body));
        }
    })
});

module.exports = { requestPromise };