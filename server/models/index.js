const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.User = require("./user.model");
db.Results = require("./result.model");



module.exports = db;