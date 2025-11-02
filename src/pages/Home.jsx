import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCard from '../components/CountryCard.jsx';

export default function Home() {
    const [countriesList, setCountriesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=flags,name,capital,cca3,region')
             .then(res => setCountriesList(res.data))
             .catch(err => console.log(err));
    }, []);

    // filter countries based on search
    const filteredCountries = searchTerm 
        ? countriesList.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : null;

     // Group countries by region
    const groupedCountries = countriesList.reduce((acc, country) => {
        const region = country.region || 'Other';
        if (!acc[region]) acc[region] = [];
        acc[region].push(country);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-5 px-4">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search Countries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full pl-10"
                        />
                    </div>
                </div>
            </div>
        {/* Countries display section */}
            <div className="max-w-7xl mx-auto px-4 pt-12">
                {filteredCountries ? (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Search Results</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCountries.map((country) => (
                                <Link key={country.cca3} to={`/country/${country.name.common}`}>
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
                     // show countries grouped by region
                    Object.keys(groupedCountries).sort().map((region) => (
                        <div key={region} className="mb-12">
                            <h2 className="text-3xl font-bold mb-6">{region}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {groupedCountries[region].map((country) => (
                                    <Link key={country.cca3} to={`/country/${country.name.common}`}>
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