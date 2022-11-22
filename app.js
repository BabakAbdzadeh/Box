const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// create application/json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use(jsonParser);

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/public/html/home.html');
})
app.post('/' ,(req, res)=>{
  console.log(req);
});


app.listen(3000, ()=>{
  console.log("connected to port 3000");
})
