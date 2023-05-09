const Result = require('../models/index').Results;

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

    const userId = "643ffb933aa88615bd24df1c";
    console.log("user id is: " + userId);
    Result.find({ user: userId })
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => console.log(err));
}

const getAdminContent = (req, res) => {
    res.status(201).json({
        message: "admin content"
    })
}


module.exports = {
    getAllResults, getAllUserResults, getAdminContent
}

