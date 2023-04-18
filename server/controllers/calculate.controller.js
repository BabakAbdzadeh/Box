// Requirements :
// Mongoose models
// AsyncHandler
// Auth
const Result = require('../models/index').results;



// @desc Get all results
// @route GET /results
// @access note-determined-yet

/**
 * @returns {object} - All the results in the database
 * @throws {Error} - If an error occurs while retrieving the results
 */

const getAllResults = (req, res) => {
    // Get all notes from MongoDB
    Result.find()
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => console.log(err));
}

// @desc Create new document
// @route POST XXXXX
// @access not-determined-yet 

/**
* @param { object } req.body - The request body containing the document information
* @returns { object } - The newly created document
* @throws { Error } - If an error occurs while creating the document
*/

const postDocument = (req, res) => {

    // new document and calculation
    // From input
    var billDocument = req.body;

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


// @desc Update an existing document
// @route PUT XXXXX/:id
// @access not-determined-yet

/**
 * Update an existing document
 *
 * @param {string} id - The ID of the document to update
 * @param {object} updatedFields - An object containing the fields to update and their new values
 * @returns {object} - The updated document
 * @throws {Error} - If the document with the given ID does not exist
 */

const updateDocument = (req, res) => {
    console.log("a request is coming");
    // Id and Parameters
    const documentID = req.params.id;
    console.log(documentID);
    const updateFields = req.body;
    // retrieve the updated document from findByIdAndUpdate using the {new:true} option.
    // retrieve the updated document using .then() by chaining a .exec() method
    Result.findByIdAndUpdate(documentID, updateFields, { new: true }).exec()
        .then((data) => {
            let billDocument = data;
            // perform calculations
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
            // save the updated document again
            billDocument.save()
                .then(() => {
                    console.log(billDocument);
                    res.status(202).send('Document updated successfully')
                })
                .catch((err) => {
                    console.error(`Error saving document: ${err}`);
                    res.status(500).send('Error saving document. ');
                })
        })
        .catch((err) => {
            console.error('error is:' + err);
        });


}

// @desc Delete a document
// @route DELETE XXXXX/:id
// @access not-determined-yet

/**
 * Delete a document
 *
 * @param {string} id - The ID of the document to delete
 * @returns {object} - A message indicating that the document has been deleted
 * @throws {Error} - If the document with the given ID does not exist
 */
const deleteDocument = (req, res) => {
    const documentId = req.params.id;
    Result.findByIdAndRemove(documentId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete document with id=${id}`
                });
            } else {
                res.send({
                    message: "Document was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Document with id=${id}`
            });
        });
}


module.exports = {
    postDocument, getAllResults, updateDocument, deleteDocument
}


// 3d-party functions:

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