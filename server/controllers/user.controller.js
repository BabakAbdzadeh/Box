const config = require("../config/auth.config");
const db = require("../models/index");
const { User: User, RefreshToken: RefreshToken } = db;
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
};


// @desc Create new user - signUp
// @route POST /users
// @access Private

const signup = (req, res) => {

    const userObject = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        roles: req.body.roles ? req.body.roles : undefined
    });

    // Confirm data
    if (!userObject.username || !req.body.password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // #NEXT-phase different Roles
    // #Finished

    const newUser = new User(userObject);

    newUser.save()
        .then(registeredUser => {
            console.log(registeredUser);
            console.log(`${registeredUser.username} has registered successfully`)
        })
        .catch(error => {

            console.error(`Error: ${error}`);
        });

    res.status(201).json(userObject);


}


// @desc Login user - signIp
// @route POST /users
// @access Private
const singin = async function (req, res) {
    console.log(req.body);
    try {
        const user = await User.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        // access token
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration, // 24 hours
        });

        const refreshToken = await RefreshToken.createToken(user);

        const authorities = [];

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            refreshToken: refreshToken
            // roles: authorities,
        });
    } catch (err) {
        console.log(`error is ${err}`);
        res.status(500).send({ message: err });
    }
};




// @desc logout user - singout
// @route POST /users ??????????????????????????????
// @access Private
const signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};

/**
 * @param {Object} req 
 * @param {JSON} res 
 * @returns {JSON} 
 * @throws {Error} 
 */
const refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};


module.exports = {
    getAllUsers, signup, singin, signout, refreshToken
}