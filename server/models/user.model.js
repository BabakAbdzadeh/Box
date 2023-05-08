const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // #SECURITY-PHASE
        // required : true
    },
    roles: {
        type: Array,
        default: ["user"]
    }
})

module.exports = mongoose.model("User", userSchema);