import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CountryCard from '../components/CountryCard.jsx';

export default function Home () {
    const [countriesList, setCountriesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=flags,flag,name,capital,cca3,region')
             .then(response => {
                console.log(response.data);
                setCountriesList(response.data);
             })
             .catch(error => console.log(error));
    }, []);

    // search results
    const filteredCountries = searchTerm 
        ? countriesList.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : null;

    // Group countries by region
    const groupedCountries = countriesList.reduce((acc, country) => {
        const region = country.region || 'Other';
        if (!acc[region]) {
            acc[region] = [];
        }
        acc[region].push(country);
        return acc;
    }, {});

    return (
        <div style={{ minHeight: '100px', backgroundColor: '#f9fafb' }}>

            {/* Search Bar */}
            <div style=
                {{ 
                backgroundColor: 'white',
                 borderBottom: '1px solid #e5e7eb'
                }}
            >

            <div style=
                {{
                    maxWidth: '1700px',
                    margin: '0 auto',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                }}
                >

            <div style=
                {{
                     position: 'relative', 
                     maxWidth: '448px'
                 }}
            >
                        <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                            <svg style={{ height: '20px', width: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Countries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                display: 'block', 
                                width: '100%', 
                                paddingLeft: '40px', 
                                paddingRight: '12px', 
                                paddingTop: '8px', 
                                paddingBottom: '8px', 
                                border: '1px solid #d1d5db', 
                                borderRadius: '6px', 
                                backgroundColor: 'white'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{
                paddingLeft: '100px',
                paddingRight: '100px',
                paddingTop:'50px'
             }}>
                {filteredCountries ? (
                    // Show search results
                    <div>
                        <h2 style={{ fontSize: '30px', fontFamily: 'Calistoga', marginBottom: '24px' }}>
                            Search Results
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '54px' }}>
                            {filteredCountries.map((country) => (
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
                ) : (
                    // Show grouped by region
                    Object.keys(groupedCountries).sort().map((region) => (
                        <div key={region} style={{ marginBottom: '48px' }}>
                            <h2 style={{ fontSize: '30px', fontFamily: 'Calistoga', marginBottom: '24px' }}>
                                {region}
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '34px' }}>
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
                    ))
                )}
            </div>
        </div>
    );
}