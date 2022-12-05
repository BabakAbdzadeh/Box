const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const url = `mongodb+srv://${username}:${password}@database.ithr0wo.mongodb.net/box`;

mongoose.connect(url);


const summarySchema = new mongoose.Schema({
  boxSum : Number,
  contributors : Map,
});


const Summary = mongoose.model('summary', summarySchema);

module.exports = Summary;
