import React, { useState } from 'react';
import AddContributors from "./AddContributors";
import AddProducts from './AddProducts.jsx';





function App() {
    const [isAddContributorsShown, setIsAddContributors] = useState(true);
    const [JSON, setJSON] = useState({
        names: [],
        products: [
            {
                name: "",
                price: "",
                payers: [
                    {
                        name: "",
                        amount: ""
                    }
                ],
                involvedPersons: []
            }
        ]
    });
    const [namesArray, setnamesArray] = useState([]);
    function chooseComponent(boolian) {
        // we want false after click
        setIsAddContributors(boolian);
    }
    function handleNamesArrayState(newState) {
        setnamesArray(newState);
    }


    return (
        <div className="app-container">
            {isAddContributorsShown ? <AddContributors handleNamesArrayState={handleNamesArrayState} chooseComponent={chooseComponent} /> : <AddProducts namesArray={namesArray} />}



        </div>
    )
}


export default App;
