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

// GET
const index = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const test = (req, response) => {
    const data = dataBuilder(testData);
    const options = optionBuilder(process.env.URI, process.env.KEY, data);

    request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            response.json(JSON.parse(body));
        } else {
            console.log("The request failed with status code: " + res.statusCode);
            response.json({ error: err });
        }
    });
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


module.exports = { index, getById, create, update, test };