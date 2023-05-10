import React, { useState, useEffect } from "react";
import { register } from "../../services/auth.service";


function RegisterComponent(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    // API call
    useEffect(() => {
        if (formSubmitted) {
            register(username, email, password);
        }
    }, [formSubmitted]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    };


    return (
        <>
            <div class="auth-form-container">
                <h2 class="login-title">Register</h2>

                <form class="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label for="name">Username </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Please write your username"
                            name="name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label for="email">Email </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="me@example.com"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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

                    <button class="btn btn--form" type="submit" value="Register">
                        Register
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegisterComponent;