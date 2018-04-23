

// GET
const index = async (req, res) => {
    try {
        const transaction = await Transaction.find();
        // run it through fraud check
        //
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}