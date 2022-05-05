import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import "./WikiSearch.css";




const WikiSearch = () => {

    
    const [results, setResults] = useState();
    const [searchParams] = useSearchParams();
    
    const urlParams = Object.fromEntries([...searchParams])

    const handleSearch = async () => {
        if (urlParams.q === '') return;
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${urlParams.q}`
        const response = await axios.get(endpoint);
        setResults(response.data)
        
    }

    useEffect(() => {
        handleSearch()
    }, [])



    return (
        <div className="search-info">
            <div className="title-input">
                <h1>About the artist</h1>
            </div>
            <div className="results">
                <div className="result">
                    {results && <p dangerouslySetInnerHTML={{__html: results.query.search[0].snippet}}/>}
                    <a href={`https://en.wikipedia.org/wiki/${urlParams.q}`} target="_blank">Read more</a>
                </div>
            </div>
        </div>
    );
}


export { WikiSearch };