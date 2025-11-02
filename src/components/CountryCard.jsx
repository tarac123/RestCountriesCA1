export default function CountryCard({ flagImg, name, capital }) {
    return (
        <div className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
            <figure className="h-48 bg-gray-100">
                <img
                    src={flagImg} 
                    alt={`${name} flag`}
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg text-gray-900">{name}</h2>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Capital:</span> {capital ? capital[0] : 'N/A'}
                </p>
                <div className="card-actions justify-end mt-2">
                    <span className="text-accent-content text-sm font-semibold">View More...</span>
                </div>
            </div>
        </div>
    );
}