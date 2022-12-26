import React, { useState } from 'react';

function Table(props) {

    const [tableData, setTableData] = useState(props.tableData);


    return (
        <div>

            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Check</th>
                    </tr>
                    <tr>
                        <td>{tableData.name}</td>
                        <td>
                            <input type="number" defaultValue={tableData.price} />
                        </td>
                        <td>-</td>
                    </tr>
                    {tableData.payers.map((payer, index) =>
                        <tr key={index}>
                            <td>{payer}</td>
                            <td>
                                <input type="number" defaultValue={0} />
                            </td>
                            <td>
                                <input type="checkbox" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}


export default Table;