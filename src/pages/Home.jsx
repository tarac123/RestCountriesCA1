import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CountryCard from '../components/CountryCard.jsx';

export default function Home () {
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=flags,flag,name,capital,cca3,region')
             .then(response => {
                console.log(response.data);
                setCountriesList(response.data);
             })
             .catch(error => console.log(error));
    }, []);

    // group countries by region
    const groupedCountries = countriesList.reduce((acc, country) => {
        const region = country.region || 'Other';
        if (!acc[region]) {
            acc[region] = [];
        }
        acc[region].push(country);
        return acc;
    }, {});

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#f9fafb', 
            padding: '32px' 
        }}>
            {Object.keys(groupedCountries).sort().map((region) => (
                <div key={region} style={{ marginBottom: '48px' }}>
                    <h2 style={{ 
                        fontSize: '30px', 
                        fontFamily: 'Calistoga',
                        marginBottom: '24px' 
                    }}>
                        {region}
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gap: '54px' 
                    }}>
                        {groupedCountries[region].map((country) => (
                            <Link 
                                key={country.cca3} 
                                to={`/country/${country.name.common}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <CountryCard 
                                    flagImg={country.flags.png}
                                    name={country.name.common}
                                    capital={country.capital}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}