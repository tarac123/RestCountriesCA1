import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

 // Get country name from url
export default function SingleCountry() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [meals, setMeals] = useState([]);


  // Map restcountry names to MealDB country names
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

   // get country data and national dishes
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
   // Show loading while getting data
  if (!country) return <p className="text-center mt-10 text-lg">Loading...</p>;

return (
  <div className="min-h-screen bg-gray-50 px-72 pt-8">
    <h1 className="text-4xl mb-6">{country.name.common}</h1>

    <div className="flex flex-wrap gap-10 justify-between mb-10">
      <div className="text-m max-w-md">
        <p><b>Capital(s):</b> {country.capital?.join(", ")}</p>
        <p><b>Region:</b> {country.region}</p>
        <p><b>Languages:</b> {Object.values(country.languages).join(", ")}</p>
        <p><b>Currency:</b> {Object.values(country.currencies).map(c => c.name).join(", ")}</p>
        <p><b>Calling Code:</b> {country.idd.root}{country.idd.suffixes?.[0]}</p>
        <p><b>Coat of Arms:</b></p>
        {country.coatOfArms.png && <img src={country.coatOfArms.png} className="w-60 mt-2" />}
      </div>
      
      <div className="flex flex-col gap-4">
        <img src={country.flags.png} className="h-48 border" />
        
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Population</div>
            <div className="stat-value">{country.population.toLocaleString()}</div> 
          </div>
        </div>
      </div>
    </div>
  {/* Collapsible section for national dishes */}
<div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
  <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">National Dishes</div>
  <div className="collapse-content text-sm">
    <div className="grid grid-cols-4 gap-6">
            {meals.slice(0, 3).map((meal) => (
              <div key={meal.idMeal} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={meal.strMealThumb} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold text-sm">{meal.strMeal}</h3>
                </div>
              </div>
            ))}
          </div>
  </div>
</div>
    </div>
  );
}