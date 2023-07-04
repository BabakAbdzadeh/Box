import React, { useState, useEffect } from "react";
import { getAdminBoard } from "../../services/user.service";

export default function AdminBoard() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        getAdminBoard()
            .then(data => setContent(data))
            .catch(error => console.error(error));

    }, []);

    return (
        <div className="board-container">
            <header className="jumbotron">
                {content.map((item, index) => (
                    <><h3 key={index}> user {index} : {item}</h3><br></br></>
                ))}
            </header>
        </div>
    );
}
