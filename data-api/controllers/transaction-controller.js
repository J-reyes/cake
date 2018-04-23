const Transaction = require('../models/transaction');

const request = require('request');
const { dataBuilder, optionBuilder } = require('../helper/helper-functions');


// GET
const index = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getFraudData = async (req, res) => {
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


module.exports = { index, getById, create, update, getFraudData };