import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CountryCard from '../components/CountryCard';

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
        <div className="min-h-screen bg-gray-50 p-8">
            {Object.keys(groupedCountries).sort().map((region) => (
                <div key={region} className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">{region}</h2>
                    <div className="grid grid-cols-4 gap-6">
                        {groupedCountries[region].map((country) => (
                            <Link 
                                key={country.cca3} 
                                to={`/country/${country.name.common}`}
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