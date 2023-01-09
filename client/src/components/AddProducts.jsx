import React, { useState } from "react";
import Table from "./Table";
const { v4: uuid } = require('uuid');


function AddProducts(props) {
    const defaultProductObj = {
        id: "",
        name: "",
        price: "",
        payers: props.payers
    }
    const [isProductRendered, setIsProductRendered] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [product, setProduct] = useState(defaultProductObj);
    const [isCallingToSendBack, setIsCallingToSendBack] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setProduct(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    function handleCLick() {
        setProduct(prevValue => {
            prevValue.id = uuid();
            return prevValue;
        })
        console.log(product);
        setProductsList((prevList) => {
            return [...prevList, product]
        });
        setProduct(defaultProductObj);
        setIsProductRendered(true);
    }

    function deleteTable(id) {
        setProductsList((prevList) => {
            return (prevList.filter(product => product.id !== id))
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="add-product-inputs-and-name">

                    <div className="product-input-name">

                        <input name="name" placeholder="Product's Name" onChange={handleInputChange} value={product.name}></input>
                    </div>
                    <div className="product-input-price">

                        <input name="price" type="number" min="0" placeholder="Product's Price" onChange={handleInputChange} value={product.price}></input>
                    </div>
                    <button onClick={() => {
                        if (product.name.length !== 0 && product.price.length !== 0) {

                            handleCLick();
                        } else {
                            alert(`Please make sure you entered the product's name and price`);
                        }
                    }}>Add Product</button>
                </div>
            </form>
            {isProductRendered && productsList.map((product, index) => <Table key={index} tableData={product} deleteTable={deleteTable} recieveData={props.recieveData} isCallingToSendBack={isCallingToSendBack} />)}
            {isProductRendered && <button onClick={() => {
                setIsCallingToSendBack(true);
            }}>Calculate</button>}

        </div>
    )


}


// Renaming
// Table for each product
// Adding id to each product
// Delete Table
// Adding data of the table
// DELETE PEOPLE FROM A PRODUCT

export default AddProducts;