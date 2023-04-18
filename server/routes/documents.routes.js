var express = require('express');
var router = express.Router();
const controller = require("../controllers/calculate.controller");

// /* GET home page. */
// router.get('/', function (req, res, next) {

//   res.render('index', { title: 'Express' });
// });


router.route('/api/documents/')
  .get(controller.getAllResults)
  .post(controller.postDocument);
router.route('/api/documents/:id')
  .put(controller.updateDocument)
  .delete(controller.deleteDocument);

module.exports = router;
