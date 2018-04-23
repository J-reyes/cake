var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var transactionSchema = new Schema({
    timeStamp: String,
    campaign: String,
    affiliate: String,
    userAgent: String,
    location: String,
    ipAddress: String
});


transactionSchema.statics.findWithFraud = async function () {
    const allTransactions = await this.find();
    // do api stuff here for fraud check
    return allTransactions.map(t => ({...t._doc, fraud: false}));
}


var Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
