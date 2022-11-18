const box = [];
function addToObject(){
  if(document.getElementById('newForm') !== null){
    console.log('add to object executed');
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
    box.push(item);
}
}

function showBox(){
  console.log(box);
}
