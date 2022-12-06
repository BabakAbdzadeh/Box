// const inputObject = {
//   0: {
//     contributors: {
//       'babak': '10',
//       'pedro': '20',
//       'madre': '0',
//       'sahand': '0'
//     },
//     product: {
//       name: 'milk',
//       price: '30'
//     }
//   },
//   1: {
//     contributors: {
//       'babak': '40',
//       'pedro': '0',
//       'madre': '0',
//       'sahand': '0'
//     },
//     product: {
//       name: 'orange',
//       price: '40'
//     }
//   },
//   2: {
//     contributors: {
//       'babak': '0',
//       'pedro': '20',
//       'madre': '0',
//       'sahand': '0'
//     },
//     product: {
//       name: 'bread',
//       price: '20'
//     }
//   },
//   3: {
//     contributors: {
//
//       'pedro': '0',
//       'madre': '30',
//       'sahand': '0'
//     },
//     product: {
//       name: 'fish',
//       price: '30'
//     }
//   },
//   4: {
//     contributors: {
//       'babak': '0',
//       'pedro': '0',
//       'madre': '0',
//       'sahand': '100'
//     },
//     product: {
//       name: 'benzin',
//       price: '100'
//     }
//   }
//
// };

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
const mongoose = require('mongoose');
const Summary = require(__dirname + '/db/db.js');
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

  if (req.query.valid !== false) {
    console.log("Query is: "+req.query)
  } else {
    console.log("this one is false : " + req.query.valid);
  }

  res.sendFile(__dirname + '/public/html/home.html');
});

app.post('/', (req, res) => {
  const inputObject = req.body;

  // Logic
  // 1) First Create sumObject
  let contributorsNamesArr = [];
  for (var index in inputObject) {
    // PARSE String to MAP
    let contributorsMap = JSON.parse(inputObject[index].contributors, reviver);
    if (contributorsNamesArr.length < contributorsMap.size) {
      contributorsNamesArr = Array.from(contributorsMap.keys());
    }
  };
  let contributorsSumMap = new Map();
  let sumObject = {
    boxSum: 0,
    contributorsSum: contributorsSumMap,
  }
  contributorsNamesArr.forEach(name => {
    sumObject.contributorsSum.set(name , 0);
  });
  // 2) Calculation and save data in sumObject
  for (var index in inputObject) {
    // PARSE String to MAP
    let contributorsMap = JSON.parse(inputObject[index].contributors, reviver);

    let productPrice = parseFloat(inputObject[index].product.price);
    let eachPersonCut = productPrice / contributorsMap.size;
    sumObject.boxSum += productPrice;
    // Loop through contributors:
    contributorsMap.forEach((amount, person, map) => {
      console.log(`for ${person}, its gonna be ${amount} - ${eachPersonCut}`);
      map.set(person, parseFloat(amount - eachPersonCut));
      if (sumObject.contributorsSum.get(person) !== undefined) {
        // Report about the correctness of the contributor's +/-
        // console.log(`Its gonna (+/-) ${parseFloat(contributorsMap.get(person))} in ${sumObject.contributorsSum.get(person)}`);
        sumObject.contributorsSum.set(person,  parseFloat(sumObject.contributorsSum.get(person) + contributorsMap.get(person)));
      }
    });

  }
  // console.log(inputObject);
  // console.log(sumObject);
  // Logic finish
  // Talk to DB:
  const newSummary = new Summary({
    boxSum: sumObject.boxSum,
    contributors: sumObject.contributorsSum,
  });
  newSummary.save();
  // Redirect Phase:
  res.status(301).json({
    redirect : "ok"
  });

});


app.get('/results', (req, res) => {
    Summary.find({}, (err, result) => {
      if (!err){

        console.log('Redirect OK');
        res.render("result", {
          result : result[result.length -1]
        });
      }else {
        console.log("Erros is: "+err);
      }
    });
 });


app.listen(3000, () => {
  console.log("connected to port 3000");
});


// Functions
// To revive stringified MAP to original dataStructure
function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}
