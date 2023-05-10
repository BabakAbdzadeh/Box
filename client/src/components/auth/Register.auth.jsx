import React from "react";


function RegisterComponent(props) {
    return (
        <>
            <div class="auth-form-container">
                <h2 class="login-title">Register</h2>

                <form class="login-form">
                    <div>
                        <label for="name">Username </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Please write your username"
                            name="name"
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
                            required
                        />
                    </div>

                    <button class="btn btn--form" type="submit" value="Log in">
                        Register
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegisterComponent;