// * Calculation Functions  

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


module.exports = {
    cutCalculator, calculateBalances, calculateSum
}