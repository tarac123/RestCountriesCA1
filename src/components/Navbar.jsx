import { Link, useNavigate } from 'react-router';
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

    const exploreRandomCountry = (e) => {
        e.preventDefault();
        if (countriesList.length > 0) {
            const randomIndex = Math.floor(Math.random() * countriesList.length);
            const randomCountry = countriesList[randomIndex];
            navigate(`/country/${randomCountry.name.common}`);
        }
    };

    return (
        <nav style={{ 
            backgroundColor: '#059669',
            color: 'white', padding: '20px 40px' }}>

            <div style=
            {{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1700px',
                margin: '0 auto' 
                }}>

                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1 style={{ fontSize: 24, margin: 0 }}>Around<br/>The World</h1>
                </Link>
                
                <div style=
                {{ 
                    display: 'flex',
                    gap: '32px' 
                }}>

                    <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
                    <a 
                        href="/explore" 
                        onClick={exploreRandomCountry} 
                        style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        Explore Random
                    </a>
                </div>
            </div>
        </nav>
    );
}