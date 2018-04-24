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


// Create arbitrary number for data field in MS API
const ipCruncher = ipString => {
    const ipStr = ipString.split(".").join("");
    const number = parseInt(ipStr.substr(0, 4));
    return number;
}

// sums up all the attributes in the output object and returns arbitrary
const scoreAnalyzer = output => {
    const checkList = ["TSpike", "ZSpike", "rpscore", "rpalert", "tscore", "talert"];
    let sum = 0;

    for (let each of checkList) {
        sum += parseFloat(output[each]);
    }

    return sum;
}

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



module.exports = { optionBuilder, dataBuilder, ipCruncher, scoreAnalyzer, requestPromise }