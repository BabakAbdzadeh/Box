import React, { useState, useEffect } from "react";
import { getAdminBoard } from "../../services/user.service";


export default function AdminBoard() {
    const [content, setContent] = useState({});
    useEffect(() => {
        getAdminBoard().then(data => setContent(data)).catch(error => console.error(error));


    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content.message}</h3>

            </header>
        </div>
    );
}

