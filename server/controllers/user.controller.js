const config = require("../config/auth.config");
const User = require("../models/index").User;
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
        email: req.body.email

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
const singin = (req, res) => {
    console.log(req.body);
    User.findOne({
        username: req.body.username,
    })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            // access token
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration, // 24 hours
            });

            var authorities = [];
            // this one is for express-session.
            // req.session.token = token;

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
                // roles: authorities,
            });
        })
        .catch((err) => {
            console.log(`error is ${err}`);
            res.status(500).send({ message: err });
        });
}



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


module.exports = {
    getAllUsers, signup, singin, signout
}