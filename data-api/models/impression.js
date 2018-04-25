var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const { 
    dataBuilder, 
    optionBuilder, 
    ipCruncher, 
    scoreAnalyzer, 
    requestPromise,
    charCodeCalculator
} = require('../helper/helper-functions');


var impressionSchema = new Schema({
    timeStamp: String,
    campaign: String,
    affiliate: String,
    userAgent: String,
    location: String,
});


impressionSchema.statics.findWithFraud = async function () {
    try {
        const allImpressions = await this.find();

        // get all timestamps and data into an object
        const dataToSend = allImpressions.map(t => ({
            Time: t["timeStamp"],
            Data: charCodeCalculator(t["location"])
        }));
        const data = dataBuilder(dataToSend);
        const options = optionBuilder(process.env.URI, process.env.KEY, data);

        // do api stuff here for fraud check
        let output = await requestPromise(options);

        // convert to a an array of objects
        output = output["Results"]["output1"];

        // convert output objects into a float
        output = output.map(o => scoreAnalyzer(o));

        return allImpressions.map((impression, index) => ({ ...impression._doc, fraud: output[index] }));
    } catch (err) {
        return err;
    }
}


var Impression = mongoose.model('impression', impressionSchema);

module.exports = Impression;
