import React, { useState, useEffect } from "react";
import AdminBoard from "./Admin-board.user";
import UserBoard from "./User-board.user";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth.service";

export default function Profile() {
    const [redirect, setRedirect] = useState(null)
    const [isUserReady, setIsUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState({ username: "" });
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeBtn, setActiveBtn] = useState('none');

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            setRedirect("/");
        } else {
            setCurrentUser(currentUser);
            setIsUserReady(true);
            if (currentUser.roles.includes("admin")) {
                setIsAdmin(true);

            }

        }
    }, []);

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="container">
            {isUserReady && (
                <div>
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser.username}</strong> Profile
                        </h3>
                    </header>
                    {isAdmin && <button onClick={() => setActiveBtn("admin-board")}> AdminBoard </button>}
                    <button onClick={() => setActiveBtn("user-board")}> User Board </button>
                    <button onClick={() => setActiveBtn("none")}> User Info </button>

                    {activeBtn === 'none' && <div className="User-Info">
                        <p>
                            <strong>Token:</strong>{" "}
                            {currentUser.accessToken.substring(0, 20)} ...{" "}
                            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                        </p>
                        <p>
                            <strong>Id:</strong>{" "}
                            {currentUser.id}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {currentUser.email}
                        </p>
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.roles &&
                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </div>}
                    {activeBtn === 'admin-board' && (
                        <div className="AdminBoard">
                            <AdminBoard />
                        </div>
                    )}
                    {activeBtn === 'user-board' && (
                        <div className="AdminBoard">
                            <UserBoard />
                        </div>
                    )}

                </div>
            )}
        </div>
    );

}

