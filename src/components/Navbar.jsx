import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Navbar() {
    const navigate = useNavigate();
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=name')
             .then(response => {
                setCountriesList(response.data);
             })
             .catch(error => console.log(error));
    }, []);
    // Explore Random evemt
    const exploreRandomCountry = (e) => {
        e.preventDefault();
        if (countriesList.length > 0) {
            const randomIndex = Math.floor(Math.random() * countriesList.length);
            const randomCountry = countriesList[randomIndex];
            navigate(`/country/${randomCountry.name.common}`);
        }
    };

return (
        <nav className="bg-emerald-600 text-white py-5 px-10">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" >
                    <h1 className="text-2xl m-0 leading-tight">
                        Around<br/>The World
                    </h1>
                </Link>
                
                <div className="flex gap-8">
                    <Link to="/" className="no-underline underline hover:underline">
                        Home
                    </Link>
                    <button 
                        onClick={exploreRandomCountry} 
                        className="no-underline underline hover:underline"
                    >
                        Explore Random
                    </button>
                </div>
            </div>
        </nav>
    );
}