import React, { useState, useEffect } from 'react';
import AddContributors from "./AddContributors";
import AddProducts from './AddProducts.jsx';
import Result from './Result';
import { getCurrentUser } from '../services/auth.service';

export default function BoxApp() {
    const [isDataRecieved, setIsDataRecieved] = useState(false);
    const [isAddContributorsVisible, setIsAddContributorsVisible] = useState(true);
    const [isFinalDocumentReady, setIsFinalDocumentReady] = useState(false);
    const [payers, setPayers] = useState([]);
    const [jsonState, setJSON] = useState({
        names: "",
        products: []
    });
    const [finalDocument, setFinalDocument] = useState();
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const user = getCurrentUser();
        const loggedUserID = user && user.id;
        if (loggedUserID) {
            setUserId(loggedUserID);
        }
    }, []);

    useEffect(() => {
        if (userId !== "") {
            setJSON((json) => ({
                ...json,
                user: userId
            }));
        }
    }, [userId]);

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
            console.log(jsonState);
            fetch('http://localhost:3001/api/data/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonState),
            })
                .then((res) => {
                    console.log(res.status);
                    return res.json();
                })
                .then((data) => {
                    console.log(data)
                    if (data) {
                        console.log(data);
                        setFinalDocument(data);
                        setIsFinalDocumentReady(true);
                    }
                });
        }
    }, [isDataRecieved])

    function chooseComponent(boolian) {
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

    return (
        isFinalDocumentReady
            ? <Result finalDocument={finalDocument} />
            : isAddContributorsVisible
                ? <AddContributors handlePayersState={handlePayersState} chooseComponent={chooseComponent} />
                : <AddProducts payers={payers} recieveData={recieveData} />
    );
}


