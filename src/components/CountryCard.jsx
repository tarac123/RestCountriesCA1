
export default function CountryCard({ flagImg, name, capital }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            {/* Flag Image */}
            <div className="w-full h-48 bg-gray-200">
                <img 
                    src={flagImg} 
                    alt={`${name} flag`}
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Country Info */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Capital:</span> {capital ? capital[0] : 'N/A'}
                </p>
                <p className="text-sm text-green-600 hover:text-green-700 mt-2 font-medium">
                    View more...
                </p>
            </div>
        </div>
    );
}