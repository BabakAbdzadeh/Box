import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../../services/auth.service"


function LoginComponent(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            setIsAuthenticated(true);
            props.onLoginSuccess(true);
            setFormSubmitted(true);
        } catch (err) {
            console.error(err);
            props.onLoginSuccess(false);
        }

    };

    if (isAuthenticated) {
        return <Navigate to="/profile" />;

    }

    return (
        <>
            <div class="auth-form-container">
                <h2 class="login-title">Log in</h2>

                <form class="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label for="name">Username </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g. CoolGuy2023"
                            name="name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label for="password">Password </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button class="btn btn--form" type="submit" value="Log in">
                        Log in
                    </button>
                </form>
            </div>
        </>
    );
}

export default LoginComponent;