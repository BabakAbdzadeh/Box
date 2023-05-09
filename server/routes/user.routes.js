var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJwt")


router
    .get('/api/user/results', [verifyToken], controller.getAllUserResults)
    .get('/api/user/admin', [verifyToken, isAdmin], controller.getAdminContent);


module.exports = router;