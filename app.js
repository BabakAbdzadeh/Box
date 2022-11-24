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

const sumObject = {
  boxSum : 0,
  contributorsSum: {
    'babak' : 0,
    'pedro': 0,
    'madre': 0,
    'sahand': 0,
  }
}








const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// create application/json parser
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static("public"));
// app.use(jsonParser);

app.get('/', (req, res) => {
  // JUSt doing the code here for easy access
  for(var index in inputObject){
    let contributorsObj = inputObject[index].contributors;
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
  // Code finished


  res.sendFile(__dirname + '/public/html/home.html');
})
app.post('/', (req, res) => {
  const inputObject = req.body;
  // Logic
  for(var index in inputObject){
    let contributorsObj = inputObject[index].contributors;
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
  res.send(sumObject);
});


app.listen(3000, () => {
  console.log("connected to port 3000");
})
