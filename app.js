const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Reading CSS, Scripts files
app.use(express.static("public"));

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/public/html/home.html');
})
app.post('/', urlencodedParser ,(req, res)=>{
  console.log(req.body);
});


app.listen(3000, ()=>{
  console.log("connected to port 3000");
})
