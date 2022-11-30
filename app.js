const inputObject = {
  0: {
    contributors: {
      'babak': '10',
      'pedro': '20',
      'madre': '0',
      'sahand': '0'
    },
    product: {
      name: 'milk',
      price: '30'
    }
  },
  1: {
    contributors: {
      'babak': '40',
      'pedro': '0',
      'madre': '0',
      'sahand': '0'
    },
    product: {
      name: 'orange',
      price: '40'
    }
  },
  2: {
    contributors: {
      'babak': '0',
      'pedro': '20',
      'madre': '0',
      'sahand': '0'
    },
    product: {
      name: 'bread',
      price: '20'
    }
  },
  3: {
    contributors: {

      'pedro': '0',
      'madre': '30',
      'sahand': '0'
    },
    product: {
      name: 'fish',
      price: '30'
    }
  },
  4: {
    contributors: {
      'babak': '0',
      'pedro': '0',
      'madre': '0',
      'sahand': '100'
    },
    product: {
      name: 'benzin',
      price: '100'
    }
  }

};

// const sumObject = {
//   boxSum : 0,
//   contributorsSum: {
//     'babak' : 0,
//     'pedro': 0,
//     'madre': 0,
//     'sahand': 0,
//   }
// }

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const queryString = require('querystring');
// create application/json parser
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
// app.use(jsonParser);

app.get('/', (req, res) => {
  // JUSt doing the code here for easy access

  if(req.query.valid !== false){
    console.log(req.query)
  }else{
    console.log("this one is false : " + req.query.valid);
  }

  res.sendFile(__dirname + '/public/html/home.html');
});

app.post('/', (req, res) => {
  const inputObject = req.body;

  // Logic
  // 1) First Create sumObject
  let contributorsNamesArr = [];
  for(var index in inputObject){
    let contributorsObj = inputObject[index].contributors;

    if(contributorsNamesArr.length < Object.keys(contributorsObj).length){
      contributorsNamesArr = Object.keys(contributorsObj);
    }};
    let sumObject = {
      boxSum : 0,
      contributorsSum : {
      }
    }
    contributorsNamesArr.forEach(name => {
      sumObject.contributorsSum[name] = 0;
    });
  // 2) Calculation and save data in sumObject
  for(var index in inputObject){
    let contributorsObj = inputObject[index].contributors;

    if(contributorsNamesArr.length < Object.keys(contributorsObj).length){
      contributorsNamesArr = Object.keys(contributorsObj);
    }
    let productPrice = parseFloat(inputObject[index].product.price);
    let eachPersonCut = productPrice/ Object.keys(contributorsObj).length ;
    sumObject.boxSum += productPrice;
    // Loop through contributors:
    for(var person in contributorsObj){
      console.log(person);
      // parseInt becuase its integer -> Later Update
      contributorsObj[person] = parseFloat(contributorsObj[person]) - eachPersonCut;
      if(sumObject.contributorsSum[person] !== undefined){
        console.log(`Its gonna (+/-) ${parseFloat(contributorsObj[person])} in ${sumObject.contributorsSum[person]}`);
        sumObject.contributorsSum[person] += parseFloat(contributorsObj[person]);

      }
    }
  }
  console.log(inputObject);
  console.log(sumObject);
  // Logic finish
//  Ready For DATABASE and redirect


});


app.listen(3000, () => {
  console.log("connected to port 3000");
});


// Functions
