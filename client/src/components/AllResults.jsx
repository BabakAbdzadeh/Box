import React from 'react';
import Result from './Result';
import { useEffect, useState } from 'react';

function AllResults() {
    const [recievedResults, setRecievedResults] = useState([]);
    useEffect(() => {
        let ignore = false;
        fetch('http://localhost:3001/')
            .then(results => {
                return results.json();
            })
            .then(data => {
                setRecievedResults(data);
            });
        console.log(recievedResults);
        return () => {
            ignore = true;
        };



    }, []);

    return (
        <div className='all-results-container'>
            <h1>All Results</h1>
            {/* ... display all results here ... */
                recievedResults.map((result, index) => <Result key={index} finalDocument={result} />)
            }
        </div>
    );
}

export default AllResults;