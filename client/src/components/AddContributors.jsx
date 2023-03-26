import React, { useState } from "react";
import _ from "lodash"


function AddContributors(props) {

    const [inputText, setInputText] = useState();
    const [payers, setPayers] = useState([]);

    function handleInputText(e) {
        setInputText(e.target.value);
    };


    function addPayer() {
        if (inputText) {
            setPayers(prevNames => {
                // using lodash 
                return [...prevNames, { name: _.startCase(inputText), paid: "0" }]
            })
        }
        setInputText("");
    }

    // new feature - button click trigger on Enter
    const handleKeyDown = e => {
        //It triggers by pressing the enter key (code : 13)
        if (e.keyCode === 13) {
            addPayer();
        }
    };


    function removePayer(nameIndex) {
        setPayers(prevNames => {
            return prevNames.filter((item, index) => {
                return index !== nameIndex;
            })
        })
    }

    function handleCLick() {
        props.handlePayersState(() => [...payers]);
        props.chooseComponent(false);
        console.log(payers);
    }
    function handleSubmit(e) {
        e.preventDefault();
    }
    // UI
    return (
        <div className="contributors-container">
            <div className="add-contributors">

                <form onSubmit={handleSubmit}>
                    <div className="input-and-button">

                        <input type="text" pattern=".*" tabIndex={0} onChange={handleInputText} onKeyDown={handleKeyDown} placeholder="Write names..." value={inputText} />

                        <button type="button" onClick={addPayer} >
                            Add
                        </button>
                    </div>
                    <div className="submit-contributors">
                        <button type="button" onClick={() => {
                            if (payers.length !== 0) {
                                handleCLick()
                            } else {
                                alert("Please Add names");
                            }
                        }}
                        >
                            Done with adding Names
                        </button>
                    </div>
                </form>
            </div>
            <div className="show-contributors">
                <ul>
                    {
                        payers.map((payer, index) => <li key={index} className="list-item">
                            <h4>
                                {payer.name}
                            </h4>

                            <button onClick={() => { removePayer(index) }}>Remove</button>
                        </li>
                        )
                    }
                </ul>
            </div>

        </div>

    )
}

export default AddContributors;