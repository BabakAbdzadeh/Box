var express = require('express');
var router = express.Router();
const controller = require("../controllers/calculate.controller");

// /* GET home page. */
// router.get('/', function (req, res, next) {

//   res.render('index', { title: 'Express' });
// });


router.route('/api/data/')
  .post(controller.postDocument);
router.route('/api/data/:id')
  .put(controller.updateDocument)
  .delete(controller.deleteDocument);

module.exports = router;
