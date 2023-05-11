import React, { useState, useEffect } from "react";
import { getUserBoard } from "../../services/user.service";


export default function UserBoard() {
    const [content, setContent] = useState({});
    useEffect(() => {
        const content = getUserBoard()
        setContent(content)

    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content.mes}</h3>
            </header>
        </div>
    );
}

