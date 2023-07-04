
import React, { useState, useEffect } from 'react';
import BoxApp from './BoxApp';
// React routing
import LoginComponent from './auth/Login.auth';
import RegisterComponent from './auth/Register.auth';
import Profile from './user/Profile.user';
import LogoutButton from './LogoutButton';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { getCurrentUser } from '../services/auth.service';




function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = (isLoggedIn) => {
        setIsLoggedIn(isLoggedIn);
    }

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="app-container">
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
                                    <LogoutButton setIsLoggedIn={setIsLoggedIn} />
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

                <Routes>
                    <Route path="/" element={<BoxApp />} />

                    <Route path="/login" element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;