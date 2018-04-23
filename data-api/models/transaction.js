var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const { dataBuilder, optionBuilder, ipCruncher, scoreAnalyzer } = require('../helper/helper-functions');
// const { requestPromise } = require('../controllers/transaction-controller');
const request = require('request');

var transactionSchema = new Schema({
    timeStamp: String,
    campaign: String,
    affiliate: String,
    userAgent: String,
    location: String,
    ipAddress: String
});


// Request Library Promise Wrapper
const requestPromise = options => new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
        if (err != null) {
            return reject(err);
        } else {
            resolve(body);
        }
    })
});


transactionSchema.statics.findWithFraud = async function () {
    try {
        const allTransactions = await this.find();

        // get all timestamps and data into an object
        const dataToSend = allTransactions.map(t => ({
            Time: t["timeStamp"],
            Data: ipCruncher(t["ipAddress"])
        }));
        const data = dataBuilder(dataToSend);
        const options = optionBuilder(process.env.URI, process.env.KEY, data);

        // do api stuff here for fraud check

        let output = await requestPromise(options);

        // convert to a an array of objects
        output = JSON.parse(output);
        output = output["Results"]["output1"];

        // convert output objects into a float
        output = output.map(o => scoreAnalyzer(o));

        return allTransactions.map((t, index) => ({ ...t._doc, fraud: output[index] }));
    } catch (err) {
        console.log("ERR", err.message);
    }
}


var Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
