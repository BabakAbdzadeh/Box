function addName(){
  const idNumber = Math.floor(Math.random() * Math.pow(10, 4));
 var data = new FormData();
 // (B2) APPEND FIELDS
 data.append("nameInput", document.getElementById("nameInput").value);


 const welcomeItem = document.getElementById('sampleName');
 if(welcomeItem !== null){
   welcomeItem.parentNode.parentNode.removeChild(welcomeItem.parentNode);
 };
 // Create the container for each name check input
 const newName = document.createElement("div");
 newName.className = "name"
// Create input for each name
 const newCheckbox = document.createElement("input");
 newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('id', `${idNumber}`);
  newCheckbox.setAttribute('name', 'name');
  newCheckbox.setAttribute('onClick', 'removeName(this)');

  const newLable = document.createElement("label");
  newLable.setAttribute('for', `${idNumber}`);
  newLable.setAttribute('class', 'name-list');
  newLable.appendChild(document.createTextNode(data.get('nameInput')));

  newName.appendChild(newCheckbox);
  newName.appendChild(newLable);


  const nameContainer = document.getElementById('name-container');
  nameContainer.appendChild(newName);


  // CLear input for next name
  document.getElementById('nameInput').value = '';

}

function addProduct(){

console.log('add product executed');
 var data = new FormData();

 // (B2) APPEND FIELDS
 data.append("productInput", document.getElementById("productInput").value);

 const welcomeItem = document.getElementById('sampleProduct');
 if(welcomeItem !== null){
   welcomeItem.parentNode.parentNode.removeChild(welcomeItem.parentNode);
 };

const newProduct = document.createElement("div");
newProduct.className = 'product';


// TABALE STARTS
const table = document.createElement("table");
const tableId = Math.floor(Math.random() * Math.pow(10, 4));
// DELETE -- P1
table.setAttribute('id', `${tableId}`);
// DELETE -- P1
const row = document.createElement("tr");
const cellOne = document.createElement('td');
const title =  document.createTextNode('Product');
cellOne.appendChild(title);
const cellTwo = document.createElement('td');
//   data entry
const productEntry = document.getElementById('productInput').value;
//  data entry
const product =  document.createTextNode(`${productEntry}`);
const productNameInput = document.createElement('input');
productNameInput.setAttribute('name', 'product');
productNameInput.setAttribute('value',`${productEntry}`);
productNameInput.setAttribute('placeholder',`${productEntry}`);
cellTwo.appendChild(productNameInput);
const cellThree = document.createElement('td');
const productPriceInput = document.createElement('input');
productPriceInput.setAttribute('placeholder', `${productEntry}'s price?`);
productPriceInput.setAttribute('name', `price`);
productPriceInput.required = true;
cellThree.appendChild(productPriceInput);
const cellFour = document.createElement('td');
const contributers = document.createTextNode('contributers');
cellFour.appendChild(contributers);

row.appendChild(cellOne);
row.appendChild(cellTwo);
row.appendChild(cellThree);
row.appendChild(cellFour);
table.appendChild(row);

// NAMES FROM HTML FILE
const namesInString = document.getElementsByClassName('name-list');
var namesArr = Array.prototype.slice.call(namesInString);

namesArr.forEach(name => {
  const rowId = Math.floor(Math.random() * Math.pow(10, 4));
  const nameRow = document.createElement('tr');
  nameRow.setAttribute('id', `${rowId}`);
  const titleCell = document.createElement('td');
  const titleText = document.createTextNode('Payer');
  titleCell.appendChild(titleText);
  nameRow.appendChild(titleCell);
  const nameCell = document.createElement('td');

  const nameText = document.createTextNode(`${name.outerText}`);
  nameCell.appendChild(nameText);
  nameRow.appendChild(nameCell);
  const payInputCell = document.createElement('td');

  const payInput = document.createElement('input');
  payInput.setAttribute('type', 'text');
    // Create a name for each person's input so then BackEnd can track which is for what
  payInput.setAttribute('name', `${name.outerText}`);
  payInput.setAttribute('value', '0');
  payInput.setAttribute('placeholder', `How much ${name.outerText} has payed?`);
  payInputCell.appendChild(payInput);
  nameRow.appendChild(payInputCell);
  const checkBoxCell = document.createElement('td');
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('onClick', 'removeFromProducts(this)');
  checkBoxCell.appendChild(checkBox);
  nameRow.appendChild(checkBoxCell);
  table.appendChild(nameRow);
});
table.setAttribute('border', '2');

// Create a form to attach the table
// reference to an element will never look "falsy"
// so leaving off the explicit null check is safe.
if(document.getElementById('newForm') !== null ){
  const oldForm = document.getElementById('newForm')
  oldForm.removeAttribute('id');

}
const form = document.createElement('form');
form.setAttribute('id', 'newForm');


form.appendChild(table);
form.appendChild(newProduct);



// TABLE FINISHED
const productContainer = document.getElementById('product-container');
productContainer.appendChild(form);


// CLear input for next name
document.getElementById('productInput').value = '';
}


function removeName(e) {
  e.parentNode.parentNode.removeChild(e.parentNode);
};

function removeFromProducts(e){
  // Has to be modified for BackEnd
console.log(e.parentNode.parentNode.getElementsByTagName('td')[2].firstChild.setAttribute('disabled', ''));

}
