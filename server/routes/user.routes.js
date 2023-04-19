var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller");

/* GET users listing. */
router
  .get('/api/user/get-all-users', controller.getAllUsers)
  .post('/api/user/register/', controller.signup)
  .post('/api/user/login', controller.singin)
  .post('/api/user/signout', controller.signout);

module.exports = router;
