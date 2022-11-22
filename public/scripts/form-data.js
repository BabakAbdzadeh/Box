// JSON.stringify wont accept Array
const boxItemsObj = {};
var counter = 0;
function addToObject(){
  if(document.getElementById('newForm') !== null){

    const form = document.getElementById('newForm');
    const formData = new FormData(form);

    let item = {
      product : {
        name : formData.get('product'),
        price : formData.get('price')
      },
      contributors : {
      }
    }

    formData.delete('product');
    formData.delete('price');
    // Display the key/value pairs
    for (const contributor of formData.entries()) {
      item.contributors[`${contributor[0]}`] = `${contributor[1]}`;
    }

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
  }).then(res => res.json())
  .then(data => console.log(data));
}
