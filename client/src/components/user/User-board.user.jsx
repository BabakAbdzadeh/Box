import React, { useState, useEffect } from "react";
import Result from "../Result";
import { getUserBoard } from "../../services/user.service";


export default function UserBoard() {
    const [content, setContent] = useState([]);
    useEffect(() => {
        const content = getUserBoard().then(data => setContent(data)).catch(error => console.error(error));

    }, []);

    return (
        <div className="user-board-container">
            {content.map((key) => (
                <header className="jumbotron">

                    < Result finalDocument={key} />
                </header>
            ))}
        </div>
    );
}


