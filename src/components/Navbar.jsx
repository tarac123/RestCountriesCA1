import { Link } from 'react-router';

export default function Navbar() {
    return (
        <nav style={{ 
            backgroundColor: '#059669',
            color: 'white', padding: '20px 40px' }}>

            <div style=
            {{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1700px',
                margin: '0 auto' 
                }}>

                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1 style={{ fontSize: 24, margin: 0 }}>Around<br/>The World</h1>
                </Link>
                
                <div style=
                {{ 
                    display: 'flex',
                    gap: '32px' 
                }}>

                    <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
                    <Link to="/explore" style={{ color: 'white', textDecoration: 'underline' }}>Explore</Link>
                </div>
            </div>
        </nav>
    );
}