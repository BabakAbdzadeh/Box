const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
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




module.exports = mongoose.model('Result', resultSchema);