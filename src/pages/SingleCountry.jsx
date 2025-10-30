import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

export default function SingleCountry() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((error) => console.log(error));
  }, [name]);

  if (country === null) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  const currencies = Object.keys(country.currencies).map((currency) => (
    <p key={currency}>
      <b>Code:</b> {currency} <br />
      <b>Name:</b> {country.currencies[currency].name} <br />
      <b>Symbol:</b> {country.currencies[currency].symbol}
    </p>
  ));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Content */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6">{country.name.common}</h1>

        <div className="flex flex-wrap gap-10">
          {/* Left column - details */}
          <div className="text-sm leading-relaxed">
            <p>
              <b>Capital:</b> {country.capital?.join(", ")}
            </p>
            <p>
              <b>Region:</b> {country.region}
            </p>
            <p>
              <b>Languages:</b> {Object.values(country.languages).join(", ")}
            </p>
            <p>
              <b>Currency:</b> {Object.values(country.currencies)
                .map((c) => c.name)
                .join(", ")}
            </p>
            <p>
              <b>Calling Code:</b> +{country.idd.root}
              {country.idd.suffixes ? country.idd.suffixes[0] : ""}
            </p>
            <p className="mt-2">
              <b>Symbol:</b>
            </p>
            {country.coatOfArms.png && (
              <img
                src={country.coatOfArms.png}
                alt="Coat of Arms"
                className="w-24 mt-2"
              />
            )}
          </div>

          {/* Right column - flag */}
          <div className="flex gap-6 items-start">
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="h-48 object-cover border"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
