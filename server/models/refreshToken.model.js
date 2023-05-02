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

RefreshTokenSchema.statics.createToken = (user) => {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let token = uuidv4();
    let newSchemaObject = new this({
        token: token,
        user: user._id,
        expiryDate: expiredAt.getTime()
    });

    let refreshTokenObject = newSchemaObject.save()
    return refreshTokenObject.token;
}

/**
 * 
 * @param {String} token 
 * @returns {boolean} 
 */

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();

}


const RefreshToken = mongoose.nodel("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;