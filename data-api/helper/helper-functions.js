// builds option for request package
const request = require('request');

const optionBuilder = (uri, key, data) => ({
    uri: uri,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key,
    },
    body: JSON.stringify(data)
});

// inputs are an array of objects {time, data}
const dataBuilder = inputs => ({
    "Inputs": {
        "input1": inputs,
    },
    "GlobalParameters": {
        "tspikedetector.sensitivity": 5,
        "zspikedetector.sensitivity": 5,
        "detectors.spikesdips": "Both",
        "detectors.historywindow": 500,
        "bileveldetector.sensitivity": 3.25,
        "trenddetector.sensitivity": 3.25,
        "postprocess.tailRows": 0
    }
});



const getFraudSpecs = options => {
    request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            response.json(JSON.parse(body));
        } else {
            console.log("The request failed with status code: " + res.statusCode);
            response.json({ error: err });
        }
    });
}



module.exports = { optionBuilder, dataBuilder, getFraudSpecs }