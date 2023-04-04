const mongoose = require('mongoose');
require('dotenv').config();


const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const url = `mongodb+srv://${username}:${password}@database.ithr0wo.mongodb.net/box`;
mongoose.connect(url);
console.log("DB is connected");


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


const Result = mongoose.model('result', resultSchema);

module.exports = { Result };