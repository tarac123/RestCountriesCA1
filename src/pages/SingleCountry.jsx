import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function SingleCountry() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [meals, setMeals] = useState([]);

  const areaMapping = {
    'Canada': 'Canadian', 'United States': 'American', 'United Kingdom': 'British',
    'China': 'Chinese', 'Croatia': 'Croatian', 'Netherlands': 'Dutch', 'Egypt': 'Egyptian',
    'Philippines': 'Filipino', 'France': 'French', 'Greece': 'Greek', 'India': 'Indian',
    'Ireland': 'Irish', 'Italy': 'Italian', 'Jamaica': 'Jamaican', 'Japan': 'Japanese',
    'Kenya': 'Kenyan', 'Malaysia': 'Malaysian', 'Mexico': 'Mexican', 'Morocco': 'Moroccan',
    'Poland': 'Polish', 'Portugal': 'Portuguese', 'Russia': 'Russian', 'Spain': 'Spanish',
    'Thailand': 'Thai', 'Tunisia': 'Tunisian', 'Turkey': 'Turkish', 'Ukraine': 'Ukrainian',
    'Vietnam': 'Vietnamese'
  };

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => {
        setCountry(res.data[0]);
        const area = areaMapping[res.data[0].name.common];
        if (area) {
          axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            .then((res) => setMeals(res.data.meals || []));
        }
      });
  }, [name]);

  if (!country) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-24 pt-8">
      <h1 className="text-2xl font-bold mb-6">{country.name.common}</h1>

      <div className="flex flex-wrap gap-10 justify-between mb-10">
        <div className="text-sm leading-relaxed max-w-md">
          <p><b>Capital:</b> {country.capital?.join(", ")}</p>
          <p><b>Region:</b> {country.region}</p>
          <p><b>Languages:</b> {Object.values(country.languages).join(", ")}</p>
          <p><b>Currency:</b> {Object.values(country.currencies).map(c => c.name).join(", ")}</p>
          <p><b>Calling Code:</b> {country.idd.root}{country.idd.suffixes?.[0]}</p>
          <p><b>Coat of Arms:</b></p>
          {country.coatOfArms.png && <img src={country.coatOfArms.png} alt="Coat of Arms" className="w-44 mt-2" />}
        </div>
        <img src={country.flags.png} alt="flag" className="h-48 border ml-auto" />
      </div>

      {meals.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">National Dishes</h2>
          <div className="grid grid-cols-4 gap-6">
            {meals.slice(0, 3).map((meal) => (
              <div key={meal.idMeal} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold text-sm">{meal.strMeal}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}