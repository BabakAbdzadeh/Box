const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    names: [String],
    products: [
        {
            id: String,
            name: String,
            price: Number,
            payers: [{
                name: String,
                paid: Number
            }]
        }
    ],
    balance: [
        {
            name: String,
            balance: Number
        }
    ],
    sum: Number
});


const Result = mongoose.model('Result', resultSchema);

module.exports = Result;