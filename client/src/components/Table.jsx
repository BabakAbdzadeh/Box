import React, { useState, useEffect, useCallback } from 'react';


function Table(props) {

    const primaryTableData = props.tableData
    let isParentComponentCallingData = props.isCallingToSendBack;
    let booleanArrayCorrespondingToPayersArrLength = new Array(primaryTableData.payers.length).fill(false);
    const [booleanStateArrayCorrespondingToCheckBox, setBooleanStateArrayCorrespondingToCheckBox] = useState(booleanArrayCorrespondingToPayersArrLength);
    const [tableDataToModify, setTableDataToModify] = useState(primaryTableData);
    const [isTableDataModificationDone, setIsTableDataModificationDone] = useState(false);

    const removeCheckedContributors = useCallback(() => {
        // remove disabled folks
        setTableDataToModify(prevValue => {
            const cloneOfPayers = [...prevValue.payers];
            const updatedPayers = cloneOfPayers.filter((payer, index) => {
                return booleanStateArrayCorrespondingToCheckBox[index] === false;
            });

            return {
                ...prevValue,
                payers: updatedPayers
            }
        });
    }, [booleanStateArrayCorrespondingToCheckBox])

    const sendTableDataToParentComponent = useCallback(() => {
        props.recieveData(tableDataToModify);
    }, [tableDataToModify, props]);

    useEffect(() => {
        if (isParentComponentCallingData) {
            removeCheckedContributors();
            finishModification();
            isParentComponentCallingData = false;
        }
    }, [isParentComponentCallingData]);

    useEffect(() => {
        if (isTableDataModificationDone) {
            sendTableDataToParentComponent();
            // avoid infinite loop
            setIsTableDataModificationDone(false);
        }
    }, [isTableDataModificationDone, sendTableDataToParentComponent]);

    function handleInputChange(e) {
        const { id, value } = e.target;
        var isZero = Boolean(value);
        const tableIndex = id;
        setTableDataToModify(prevValue => {
            const updatedPayers = [...prevValue.payers];
            updatedPayers[tableIndex] = {
                ...updatedPayers[tableIndex],
                paid: isZero ? value : '0'
            };
            return {
                ...prevValue,
                payers: updatedPayers
            }
        });
    };

    function checkBoxUpdate(e, index) {
        setBooleanStateArrayCorrespondingToCheckBox((prevState) => {
            const newState = [...prevState];
            newState[index] = e.target.checked;
            return newState;
        });
    }
    function finishModification() {
        setIsTableDataModificationDone(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className='product-table'>

            <form onSubmit={handleSubmit}>
                <div class="numbertext"> JS code gonna do it here! </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Exclude</th>
                        </tr>
                        <tr>
                            <td>{primaryTableData.name}</td>
                            <td>
                                <input type="number" name="price" defaultValue={primaryTableData.price} />
                            </td>
                            <td>-</td>
                        </tr>
                        {primaryTableData.payers.map((payer, index) =>
                            <tr key={index}>
                                <td>{payer.name}</td>
                                <td>
                                    <input type="number" id={index} disabled={booleanStateArrayCorrespondingToCheckBox[index]} name="payer.paid" placeholder="How much paid?" onChange={handleInputChange} />
                                </td>
                                <td>
                                    <input type="checkbox" onChange={(e) => checkBoxUpdate(e, index)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className="remove-product" onClick={() => props.deleteTable(primaryTableData.id)}>Remove product</button>
            </form>

        </div>
    );
}


export default Table;



// Add users paid amount.


// Now it's send data back to APP.js properly


