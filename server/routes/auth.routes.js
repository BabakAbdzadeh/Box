var express = require('express');
var router = express.Router();
const controller = require("../controllers/auth.controller");


/* GET users listing. */
router
  .post('/api/user/register', controller.signup)
  .post('/api/user/login', controller.singin)
  .post('/api/user/signout', controller.signout)
  .post('/api/auth/refreshtoken', controller.refreshToken);

module.exports = router;
