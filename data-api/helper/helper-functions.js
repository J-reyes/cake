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

const ipCruncher = ipString => {
    const ipStr = ipString.split(".").join("");
    const number = parseInt(ipStr.substr(0, 4));
    return number;
}

// sums up all the attributes in the output object and returns arbitrary bool
const scoreAnalyzer = output => {
    const checkList = ["TSpike", "ZSpike", "rpscore", "rpalert", "tscore", "talert"];
    let sum = 0;

    for (let each of checkList) {
        sum += parseFloat(output[each]);
    }

    return sum;
}



module.exports = { optionBuilder, dataBuilder, getFraudSpecs, ipCruncher, scoreAnalyzer }