
import React, { useState, useEffect } from 'react';

import AddContributors from "./AddContributors";
import AddProducts from './AddProducts.jsx';
import Result from './Result'
// React routing
import AllResults from './AllResults';
import LoginComponent from './auth/Login.auth';
import RegisterComponent from './auth/Register.auth';
import Profile from './user/Profile.user';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import { logout } from '../services/auth.service';




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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // user ID for attaching it to the document.
    const [userId, setUserId] = useState("");

    const handleLoginSuccess = (isLoggedIn) => {
        setIsLoggedIn(isLoggedIn);
        // do something with the userData, if needed
    }


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
            fetch('http://localhost:3001/', {
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

    // For - POST request using Postman
    function handleFetchClick() {
        getInfo();
        setIsDataRecieved(true);
    }

    function logOut() {
        logout();
        setIsLoggedIn(false);
    }
    return (
        <>
            <BrowserRouter>
                <div className="app-container">
                    {/* <button onClick={handleFetchClick}> Postman - Fetch Data</button> */}
                    {/* Routing - Start */}
                    {/* navbar-test */}
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            Box App
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/all-results"} className="nav-link">
                                    View All Results
                                </Link>
                            </li>
                        </div>

                        <div className="navbar-nav ml-auto">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link" onClick={logOut}>
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            Sign Up
                                        </Link>
                                    </li>
                                </>

                            )}


                        </div>
                    </nav>
                    {/* navbar-test-finished */}
                    <Routes>

                        <Route exact path="/" element=

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
                        />
                        {/* Add a Route component to render the AllResults component */}
                        <Route exact path="/all-results" element={<AllResults />} />
                        <Route exact path="/login" element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
                        <Route exact path="/register" element={<RegisterComponent />} />
                        <Route exact path="/profile" element={<Profile />} />


                    </Routes>
                    {/* Routing Finished */}

                </div>
            </BrowserRouter>
        </>
    );
}


// add id to the jsonState structor.
export default App;
