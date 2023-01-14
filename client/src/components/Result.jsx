import React from "react";

function Result(props) {
    const obj = props.finalDocument

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

    return (

        <table className="out-table">
            {/* First Row */}
            <tr>
                <th> BOX </th>
                <th> Price </th>
                {obj.names.map((name) => (
                    <th>{name}</th>
                ))}
            </tr>
            {/* Second Row */}
            {obj.products.map((product) => {
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
                <td>{obj.sum}</td>
                {obj.balance.map((contributor) => {
                    return <td> {contributor.balance} </td>;
                })}
            </tr>
        </table>

    );
}

export default Result;
