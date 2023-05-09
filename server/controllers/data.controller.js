const Result = require('../models/index').Results;
const calculation = require('../utils/calculation');



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
    if (req.body.username) {
        billDocument['user'] = req.body.username;
    }
    // calculate contributor's cut for each product 
    billDocument.products.forEach(product => {
        // for more visibility
        const numberOfPayersOnThisProduct = product.payers.length;
        const productPrice = Number(product.price);
        let cut = calculation.cutCalculator(productPrice, numberOfPayersOnThisProduct);

        product.payers.forEach(payer => {
            payer.paid = Math.round(((Number(payer.paid) - cut) + Number.EPSILON) * 100) / 100;
        });
    });
    billDocument["balance"] = calculation.calculateBalances(billDocument.products, billDocument.names);;
    billDocument["sum"] = calculation.calculateSum(billDocument.products);

    // 2. save the document to DB
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
                let cut = calculation.cutCalculator(productPrice, numberOfPayersOnThisProduct);

                product.payers.forEach(payer => {
                    payer.paid = Math.round(((Number(payer.paid) - cut) + Number.EPSILON) * 100) / 100;
                });
            });
            billDocument["balance"] = calculation.calculateBalances(billDocument.products, billDocument.names);;
            billDocument["sum"] = calculaiton.calculateSum(billDocument.products);
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
    postDocument, updateDocument, deleteDocument
}

