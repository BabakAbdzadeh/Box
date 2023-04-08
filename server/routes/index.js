var express = require('express');
var router = express.Router();
const calculateController = require("../controllers/calculate");

// /* GET home page. */
// router.get('/', function (req, res, next) {

//   res.render('index', { title: 'Express' });
// });


router.route('/')
  .get(calculateController.getAllResults)
  .post(calculateController.postDocument);
router.route('/:id')
  .put(calculateController.updateDocument)
  .delete(calculateController.deleteDocument);

module.exports = router;
