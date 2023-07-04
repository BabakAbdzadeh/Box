const Result = require('../models/index').Results;
const User = require('../models/index').User;
// @desc Get all results
// @route GET /results
// @access note-determined-yet
/**
 * @returns {object} - All the results in the database
 * @throws {Error} - If an error occurs while retrieving the results
 */

const getAllResults = (req, res) => {
    // Get all documents from MongoDB for ADMIN
    Result.find()
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => console.log(err));
}

// @desc Get user's history results
// @route GET /api/user/results
// @access user-access/private
/**
 * @returns {object} - All the results in the database
 * @throws {Error} - If an error occurs while retrieving the results
 */
const getAllUserResults = (req, res) => {
    // Get all document related to user from DB 

    const userId = req.query.id;
    console.log("user id is: " + userId);
    Result.find({ user: userId })
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => console.log(err));
}

const getAdminContent = (req, res) => {
    User.find().select('username -_id') // Exclude the '_id' field
        .then(users => {
            const usernames = users.map(user => user.username); // Array of usernames
            res.status(200).json(usernames);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error occurred while fetching usernames" });
        });
}


module.exports = {
    getAllResults, getAllUserResults, getAdminContent
}

