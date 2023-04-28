var express = require('express');
var router = express.Router();
const controller = require("../controllers/calculate.controller");
const { verifyToken } = require("../middlewares/authJwt")


router
    .get('/api/user/results', [verifyToken], controller.getAllUserResults);


module.exports = router;