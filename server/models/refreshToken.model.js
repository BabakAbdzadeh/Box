const mongoose = require("mongoose");
const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");


const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    // one-to-one relationship to user model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    expiryDate: Date,
});


/**
 * 
 * @param {Object} user 
 * @returns {String} token 
 */
RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtRefreshExpiration
    );

    let _token = uuidv4();

    let _object = new this({
        token: _token,
        user: user._id,
        expiryDate: expiredAt.getTime(),
    });

    console.log(_object);

    let refreshToken = await _object.save();

    return refreshToken.token;
};

/**
 * 
 * @param {String} token 
 * @returns {boolean} 
 */
RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}



module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);;