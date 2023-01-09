var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});


router.post('/', (req, res, next) => {
  const reqObj = req.body;
  console.log(reqObj);
  reqObj.products.forEach(product => console.log(product.payers));
  res.status("ok").json({
    redirect: "ok"
  });
})

module.exports = router;
