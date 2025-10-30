export default function CountryCard({ flagImg, name, capital }) {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}
        >
            {/* Flag Image */}
            <div style={{ 
                width: '100%', 
                height: '230px', 
                backgroundColor: '#e5e7eb' 
            }}>
                <img 
                    src={flagImg} 
                    alt={`${name} flag`}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'fill' 
                    }}
                />
            </div>
            
            {/* Country info */}
            <div style={{ padding: '16px' }}>
                <h3 style={{ 
                    fontSize: '18px', 
                    fontFamily: 'Calistoga ', 
                    color: '#111827', 
                    marginBottom: '4px' 
                }}>
                    {name}
                </h3>
                <p style={{ 
                    fontSize: '14px', 
                    color: '#4b5563',
                    marginBottom: '8px'
                }}>
                    <span style={{ fontWeight: '600' }}>Capital:</span> {capital ? capital[0] : 'N/A'}
                </p>
                <p style={{ 
                    fontSize: '14px', 
                    color: '#059669', 
                    fontWeight: '500' 
                }}>
                    View more...
                </p>
            </div>
        </div>
    );
}