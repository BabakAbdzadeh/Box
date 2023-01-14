
import React, { useState, useEffect } from 'react';
import AddContributors from "./AddContributors";
import AddProducts from './AddProducts.jsx';
import Result from './Result'




function App() {
    const [isDataRecieved, setIsDataRecieved] = useState(false);
    const [isAddContributorsVisible, setIsAddContributorsVisible] = useState(true);
    const [isFinalDocumentReady, setIsFinalDocumentReady] = useState(false);
    const [payers, setPayers] = useState([]);
    const [jsonState, setJSON] = useState({
        names: "",
        products: []
    });
    const [finalDocument, setFinalDocument] = useState();

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
            fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonState),
            }) // response from BackEnd comes here
                .then((res) => {
                    console.log(res.status);
                    return res.json();
                })
                .then((data) => {
                    console.log(data)
                    if (data) {
                        // window.location.href = "/results";
                        console.log(data);
                        setFinalDocument(data);
                        setIsFinalDocumentReady(true);
                    }
                });
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
        console.log(jsonState);
    }

    return (
        <div className="app-container">
            {
                isFinalDocumentReady
                    ?
                    <Result finalDocument={finalDocument} />
                    :
                    isAddContributorsVisible
                        ?
                        <AddContributors handlePayersState={handlePayersState} chooseComponent={chooseComponent} />
                        :
                        <AddProducts payers={payers} recieveData={recieveData} />
            }
            <button onClick={getInfo}> click me!</button>
        </div>
    )
}


// add id to the jsonState structor.
export default App;
