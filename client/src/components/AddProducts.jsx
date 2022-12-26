import React, { useState } from "react";
import Table from "./Table";


function AddProducts(props) {
    const [isRendered, setRender] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        payers: props.namesArray
    });
    function handleChange(e) {
        const { name, value } = e.target
        setProduct(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
        console.log(product);
    }
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="add-product-inputs-and-name">

                    <div className="product-input-name">

                        <input name="name" placeholder="Product's Name" onChange={handleChange} value={product.name}></input>
                    </div>
                    <div className="product-input-price">

                        <input name="price" type="number" min="0" placeholder="Product's Price" onChange={handleChange} value={product.price}></input>
                    </div>
                    <button onClick={() => { setRender(true) }}>Add Product</button>
                </div>
            </form>
            {isRendered && <Table tableData={product} />}


        </div>
    )


}


export default AddProducts;