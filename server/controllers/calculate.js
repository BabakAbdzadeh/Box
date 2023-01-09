// logic
// Test object
var testObject = {
    names: ['Babak', 'Mamad', 'Madre', 'Pedro', 'Omid', 'Bahar'],
    products: [
        {
            id: 'c320308f-a004-4e0c-95e4-78088dfff5d8',
            name: 'iphone 11',
            price: '1500',
            payers: [{ name: 'Babak', paid: '1000' }, { name: 'Bahar', paid: '500' }]
        },
        {
            id: 'd2d9ba4e-f833-49d4-a8fa-f4bc4438b44d',
            name: 'iphone 12',
            price: '2000',
            payers: [{ name: 'Babak', paid: '2000' }, { name: 'Mamad', paid: '0' }]
        },
        {
            id: '15c6686a-18f7-458e-a4e9-e0b4ae95d464',
            name: 'orange',
            price: '50',
            payers: [{ name: 'Babak', paid: '0' },
            { name: 'Mamad', paid: '0' },
            { name: 'Madre', paid: '50' },
            { name: 'Pedro', paid: '0' },
            { name: 'Omid', paid: '0' },
            { name: 'Bahar', paid: '0' }]
        },
        {
            id: '80b21a6e-4ff9-4b41-88c3-c4f953c4aa81',
            name: 'test',
            price: '4000',
            payers: [{ name: 'Babak', paid: '2000' },
            { name: 'Mamad', paid: '0' },
            { name: 'Madre', paid: '0' },
            { name: 'Pedro', paid: '0' },
            { name: 'Omid', paid: '2000' },
            { name: 'Bahar', paid: '0' }]
        }
    ]
};

// 0. prepration
// From input
var requestBody = testObject;

const totNumOfPayers = requestBody.names.length;
const numOfProducts = requestBody.products.length;

// For output
const resultArr = requestBody.names.map(name => {
    return {
        name: name,
        balance: Number(0)
    }
});

// 1. calculate for eachProduct
requestBody.products.forEach(product => {
    // for more visibility
    const numberOfPayersOnThisProduct = product.payers.length;
    const productPrice = Number(product.price);
    let cut = cutCalculator(productPrice, numberOfPayersOnThisProduct);

    product.payers.forEach(payer => {
        payer.paid = Number(payer.paid) - cut;
    });
});

console.log(requestBody);
requestBody.products.forEach(product => {
    console.log(product.payers);
})

console.log(resultArr);
// 2. 
// 3. 





function cutCalculator(price, numberOfContributors) {
    return price / numberOfContributors;
}