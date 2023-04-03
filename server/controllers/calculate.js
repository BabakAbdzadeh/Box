// Requirements :
// Mongoose models
// AsyncHandler
// Auth

const Result = require('../models/Result').Result;


// @desc Create new document
// @route POST XXXXX
// @access not-determined-yet 
const postDocument = (req, res) => {

    // new document and calculation
    // From input
    var billDocument = req.body;
    // console.log(req);
    console.log(billDocument);

    // calculate contributor's cut for each product 
    billDocument.products.forEach(product => {
        // for more visibility
        const numberOfPayersOnThisProduct = product.payers.length;
        const productPrice = Number(product.price);
        let cut = cutCalculator(productPrice, numberOfPayersOnThisProduct);

        product.payers.forEach(payer => {
            payer.paid = Math.round(((Number(payer.paid) - cut) + Number.EPSILON) * 100) / 100;
        });
    });
    billDocument["balance"] = calculateBalances(billDocument.products, billDocument.names);;
    billDocument["sum"] = calculateSum(billDocument.products);

    // 2. Save the document to DB
    const newResultDocument = new Result(billDocument);
    newResultDocument.save()
        .then(newDocument => {
            console.log(`New Document: ${newDocument}`);
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });

    // 3. Handle the Response
    // if(!err) from db <--> I have to update to async
    //  201 and 400
    res.status(201).json(billDocument);

}




module.exports = {
    postDocument
}



// Calculation funcitons  

function cutCalculator(price, numberOfContributors) {
    // rounding
    return price / numberOfContributors;
}

function calculateBalances(products, names) {
    const balances = {};

    // Iterate over each person in the names array
    for (const name of names) {
        // Set the balance for the current person to 0 in the balances object
        balances[name] = 0;
    }

    // Iterate over each product in the products array
    for (const product of products) {
        // For each payer in the payers array of the current product,
        // add the paid value to the balance for that person in the balances object
        for (const payer of product.payers) {
            balances[payer.name] += Math.round((payer.paid + Number.EPSILON) * 100) / 100;
        }
    }

    // Map the balances object to an array of objects with name and balance properties
    const result = Object.keys(balances).map(name => ({
        name,
        balance: balances[name]
    }));

    // Return the result array
    return result;
}

function calculateSum(products) {
    let sum = 0;
    products.forEach(product => sum += Number(product.price));
    return sum;
}