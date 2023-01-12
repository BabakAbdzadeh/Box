var express = require('express');
var router = express.Router();
const calculateController = require("../controllers/calculate");

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});


router.route('/')
  .post(calculateController.postDocument);

module.exports = router;
