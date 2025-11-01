import { useEffect, useState } from 'react';
import { Link } from 'react-router';
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

    const filteredCountries = searchTerm 
        ? countriesList.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : null;

    const groupedCountries = countriesList.reduce((acc, country) => {
        const region = country.region || 'Other';
        if (!acc[region]) acc[region] = [];
        acc[region].push(country);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[1700px] mx-auto py-5">
                    <div className="relative max-w-md">
                        <svg className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search Countries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>

            <div className="px-[100px] pt-[50px]">
                {filteredCountries ? (
                    <div>
                        <h2 className="text-[30px] font-['Calistoga'] mb-6">Search Results</h2>
                        <div className="grid grid-cols-4 gap-[54px]">
                            {filteredCountries.map((country) => (
                                <Link key={country.cca3} to={`/country/${country.name.common}`} className="no-underline">
                                    <CountryCard flagImg={country.flags.png} name={country.name.common} capital={country.capital} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    Object.keys(groupedCountries).sort().map((region) => (
                        <div key={region} className="mb-12">
                            <h2 className="text-[30px] font-['Calistoga'] mb-6">{region}</h2>
                            <div className="grid grid-cols-4 gap-[34px]">
                                {groupedCountries[region].map((country) => (
                                    <Link key={country.cca3} to={`/country/${country.name.common}`} className="no-underline">
                                        <CountryCard flagImg={country.flags.png} name={country.name.common} capital={country.capital} />
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