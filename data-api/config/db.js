var mongoose = require('mongoose');

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once('open', () => {
    console.log("Connected to mongo");
})

module.exports = mongoose;