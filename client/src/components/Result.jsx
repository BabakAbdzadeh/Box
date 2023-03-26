import React from "react";
import { useMemo } from "react";
// import toggleRotate from "../utils/rotate-button";
import createPDF from "../utils/pdf-print";


function Result(props) {
    const obj = props.finalDocument
    // Remove people who are not involved in the specific product's share.
    obj.products.forEach((product) => {
        const newPayers = obj.names.map((name) => {
            const payer = product.payers.find((p) => p.name === name);
            if (payer) {
                return payer;
            } else {
                return { name: name, paid: null };
            }
        });
        product.payers = newPayers;
    });

    const dataObject = useMemo(() => obj);


    return (

        <div className="result-container">


            <table className="result-table" id="result-table">
                {/* First Row */}
                <tr>
                    <th> BOX </th>
                    <th> Price </th>
                    {dataObject.names.map((name) => (
                        <th>{name}</th>
                    ))}
                </tr>
                {/* Second Row */}
                {dataObject.products.map((product) => {
                    return (
                        <tr>
                            <th> {product.name} </th>
                            <td> {product.price} </td>
                            {product.payers.map((payer) => {
                                return (
                                    <td>{payer.paid != null ? payer.paid : <p> *** </p>}</td>
                                );
                            })}
                        </tr>
                    );
                })}
                <tr>
                    <th>Summary:</th>
                    <td>{dataObject.sum}</td>
                    {dataObject.balance.map((contributor) => {
                        return <td> {contributor.balance} </td>;
                    })}
                </tr>
            </table>

            <div className="result-controller">
                {/* <button id="rotate-btn" onClick={() => toggleRotate()
                }>Rotate</button> */}
                <button onClick={() => createPDF("result-table")}>Print</button>

            </div>


        </div>


    );
}

export default Result;
