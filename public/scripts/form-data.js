// JSON.stringify wont accept Array
const boxItemsObj = {};
var counter = 0;
function addToObject(){
  if(document.getElementById('newForm') !== null){

    const form = document.getElementById('newForm');
    const formData = new FormData(form);
    const contributorsMap = new Map();
    const item = {
      product : {
        name : formData.get('product'),
        price : formData.get('price')
      },
      contributors : '',
    }

    formData.delete('product');
    formData.delete('price');
    // Display the key/value pairs
    for (const contributor of formData.entries()) {
      contributorsMap.set(contributor[0], contributor[1]);
    }
    // USING replacer funciton to stringify the map
    const contributorsStringify = JSON.stringify(contributorsMap, replacer);
    item.contributors = contributorsStringify;

    boxItemsObj[counter] = item;
    counter++;
}
}



function showBox(){
  console.log(boxItemsObj);
}



function submit(){

  fetch('/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(boxItemsObj),
  }) // response from BackEnd comes here
  .then((res) => {
    console.log(res.status);
    return res.json();
  })
  .then((data) => {
    console.log(data)
    if(data.redirect === 'ok'){
      window.location.href = "/results";
    }
  });
}



// Additional Function to send map over POST request
function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
