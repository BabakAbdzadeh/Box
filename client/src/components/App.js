
import React, { useState, useEffect } from 'react';
import AddContributors from "./AddContributors";
import AddProducts from './AddProducts.jsx';





function App() {
    const [isDataRecieved, setIsDataRecieved] = useState(false);
    const [isAddContributorsVisible, setIsAddContributorsVisible] = useState(true);
    const [payers, setPayers] = useState([]);
    const [JSON, setJSON] = useState({
        names: "",
        products: [
            // {
            //     id: "",
            //     name: "",
            //     price: "",
            //     payers: [
            //         {
            //             name: "",
            //             paid: ""
            //         }
            //     ]
            // }
        ]
    });

    useEffect(() => {
        let tempNamesHolder = [];
        payers.forEach(payer => {
            tempNamesHolder.push(payer.name);
        })
        setJSON(json => (
            {
                ...json,
                names: tempNamesHolder
            }
        ));
    }, [payers]);

    useEffect(() => {
        if (isDataRecieved) {
            console.log("rdy to send data to back-END");
        }
        // fetch()
    }, [isDataRecieved])

    function chooseComponent(boolian) {
        // we want false after click
        setIsAddContributorsVisible(boolian);
    }
    function handlePayersState(newState) {
        setPayers(newState);

    }
    function recieveData(data) {
        setJSON(prevValues => {
            const updatedProductArray = [...prevValues.products, data];
            return {
                ...prevValues,
                products: updatedProductArray
            }
        });
        setIsDataRecieved(true);
    }
    function getInfo() {
        console.log(JSON);
    }

    return (
        <div className="app-container">
            {isAddContributorsVisible ? <AddContributors handlePayersState={handlePayersState} chooseComponent={chooseComponent} /> : <AddProducts payers={payers} recieveData={recieveData} />}
            <button onClick={getInfo}> click me!</button>
        </div>
    )
}


// add id to the JSON structor.
export default App;
