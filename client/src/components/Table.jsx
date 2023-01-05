import React, { useState, useEffect, useCallback } from 'react';

function Table(props) {

    const tableData = props.tableData
    let falsesArray = new Array(tableData.payers.length).fill(false);
    const [inputDisabledState, setInputDisabledState] = useState(falsesArray);
    const [modifiedTableData, setModifiedTableData] = useState(tableData);
    const [isReady, setIsReady] = useState(false);

    const sendBack = useCallback(() => {
        props.recieveData(modifiedTableData);
    }, [modifiedTableData, props]);

    useEffect(() => {
        if (isReady) {
            sendBack();
        }
    }, [isReady, sendBack]);

    function handleInputChange(e) {
        const { id, value } = e.target;
        const tableIndex = id;
        setModifiedTableData(prevValue => {
            const updatedPayers = [...prevValue.payers];
            updatedPayers[tableIndex] = {
                ...updatedPayers[tableIndex],
                paid: value
            };
            return {
                ...prevValue,
                payers: updatedPayers
            }
        });
    };

    function checkBox(e, index) {
        setInputDisabledState((prevState) => {
            const newState = [...prevState];
            newState[index] = e.target.checked;
            return newState;
        });
    }

    function preprationToSendBack() {
        // remove disabled folks
        // useState
        setModifiedTableData(prevValue => {
            const cloneOfPayers = [...prevValue.payers];
            const updatedPayers = cloneOfPayers.filter((payer, index) => {
                return inputDisabledState[index] === false;
            });
            console.log(updatedPayers);
            return {
                ...prevValue,
                payers: updatedPayers
            }
        });
        setIsReady(true);
        // console.log(modifiedTableData);
        // NEXT I HAVE TO START FROM HERE
        // props.recieveData(modifiedTableData);
    }
    function handleSubmit(e) {
        e.preventDefault();
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Not participant</th>
                        </tr>
                        <tr>
                            <td>{tableData.name}</td>
                            <td>
                                <input type="number" name="price" defaultValue={tableData.price} />
                            </td>
                            <td>-</td>
                        </tr>
                        {tableData.payers.map((payer, index) =>
                            <tr key={index}>
                                <td>{payer.name}</td>
                                <td>
                                    <input type="number" id={index} disabled={inputDisabledState[index]} name="payer.paid" placeholder="How much paid?" onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type="checkbox" onChange={(e) => checkBox(e, index)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button onClick={() => props.deleteTable(tableData.id)}> Remove product</button>
                <button onClick={() => {
                    preprationToSendBack();
                }}> Next</button>
            </form>

        </div>
    );
}


export default Table;



// Add users paid amount.