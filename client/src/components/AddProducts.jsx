import React, { useState, useEffect } from "react";
import Table from "./Table";
import { plusSlides, numberText } from "../utils/TablesSlideShow";
import { toggleDropdown } from "../utils/r-dropdown";

const { v4: uuid } = require('uuid');

function AddProducts(props) {
    // Main function
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

    // This part is for having the latest added table on the screen:
    const [isTheLatestTableRendered, setIsTheLatestTableRendered] = useState(false);

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

        // Update part! for table rendering (related to CSS and JS)
        setIsTheLatestTableRendered(true);

    }

    function deleteTable(id) {
        setProductsList((prevList) => {
            return (prevList.filter(product => product.id !== id))
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
    }

    // For Having the latest tables on the screen automatically.
    useEffect(() => {
        if (isTheLatestTableRendered) {
            plusSlides(1);
            numberText();
        }
        setIsTheLatestTableRendered(false);
    }, [isTheLatestTableRendered]);




    // UI
    return (
        <div className="add-product-container">
            <div className="dropdown-container">
                <button onClick={() => toggleDropdown()} className="dropbtn">Drop me down!</button>
                <div id="gmDropdown" className="dropdown-content">

                    <form onSubmit={handleSubmit}>
                        <div className="add-product-inputs-and-name">

                            {/* <div className="product-input-name"> */}

                            <input name="name" placeholder="Product's Name" onChange={handleInputChange} value={product.name}></input>
                            {/* </div>
                    <div className="product-input-price"> */}

                            <input name="price" type="number" min="0" placeholder="Product's Price" onChange={handleInputChange} value={product.price}></input>
                            {/* </div> */}
                            <button onClick={() => {
                                if (product.name.length !== 0 && product.price.length !== 0) {

                                    handleCLick();

                                } else {
                                    alert(`Please make sure you entered the product's name and price`);
                                }
                            }}>Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="product-tables-container">
                <div className="table-control-button">
                    <a className="prev" onClick={() => { plusSlides(-1); numberText() }}>&#10094;</a>
                </div>
                {isProductRendered && productsList.map((product, index) => <Table key={index} tableData={product} deleteTable={deleteTable} recieveData={props.recieveData} isCallingToSendBack={isCallingToSendBack} />)}
                {/* Next and previous buttons */}
                <div className="table-control-button">
                    <a className="next" onClick={() => { plusSlides(1); numberText() }}>&#10095;</a>
                </div>
            </div>
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