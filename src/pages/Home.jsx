import { useEffect, useState,  } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import CountryCard from '../components/CountryCard';

export default function Home () {
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=flags,flag,name,capital,cca3')
             .then(response => {
                console.log(response.data);
                setCountriesList(response.data);
             })
             .catch(error => console.log(error));
    }, []);

    let countryCards = countriesList.map((country) => {
        return (
            <Link 
                key={country.cca3} 
                to={`/country/${country.name.common}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
                <CountryCard 
                    flagImg={country.flags.png}
                    name={country.name.common}
                    capital={country.capital}
                />
            </Link>
        );
    });

    return (
        <div>
            <h1>Home</h1>
            {countryCards}
        </div>
    );
};