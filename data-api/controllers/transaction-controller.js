const Transaction = require('../models/transaction');

const request = require('request');
const { dataBuilder, optionBuilder } = require('../helper/helper-functions');

const testData = [
    {
        Time: "6/18/2014 12:00:00 AM",
        Data: 4600
    },
    {
        Time: "6/18/2016 12:00:00 AM",
        Data: 6009
    }
]

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


// GET
const index = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const test = async (req, res) => {
    // const data = dataBuilder(testData);
    // const options = optionBuilder(process.env.URI, process.env.KEY, data);

    // try {
    //     let body = await requestPromise(options);
    //     body = JSON.parse(body);
    //     res.json(body["Results"]);
    // } catch (err) {
    //     res.status(500).json({ error: err.message });
    // }
    try {
        const transactionsWithFraudDetails = await Transaction.findWithFraud();
        res.json(transactionsWithFraudDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// GET by ID
const getById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const update = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// POST
const create = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { index, getById, create, update, test, requestPromise };