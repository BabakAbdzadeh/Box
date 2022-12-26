import React, { useState } from "react";
import _ from "lodash"


function AddContributors(props) {
    // Hooks
    const [inputText, setInputText] = useState();
    const [namesArray, setNames] = useState([]);
    // Methods
    function handleInputText(e) {

        setInputText(e.target.value);

    };
    function addNames() {
        if (inputText) {
            setNames(prevNames => {
                // using lodash 
                return [...prevNames, _.startCase(inputText)]
            })
        }
        setInputText("");
    }
    function removeName(nameIndex) {
        setNames(prevNames => {
            return prevNames.filter((item, index) => {
                return index !== nameIndex;
            })
        })
    }

    function handleCLick() {
        props.handleNamesArrayState(() => [...namesArray]);
        props.chooseComponent(false);
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

                        <input type="text" pattern=".*" onChange={handleInputText} placeholder="Write names..." value={inputText} />

                        <button type="button" onClick={addNames}>
                            Add
                        </button>
                    </div>
                    <div className="submit-contributors">
                        <button type="button" onClick={() => {
                            if (namesArray.length !== 0) {
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
                        namesArray.map((item, index) => <li key={index} className="list-item">
                            <h4>
                                {item}
                            </h4>

                            <button onClick={() => { removeName(index) }}>Remove</button>
                        </li>
                        )
                    }
                </ul>
            </div>

        </div>

    )
}

export default AddContributors;