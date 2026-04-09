import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🎬</span>
                    <span className="brand-text">AniTracker</span>
                </Link>
                <div className="navbar-links">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Search
                    </Link>
                    <Link
                        to="/mylist"
                        className={`nav-link ${location.pathname === '/mylist' ? 'active' : ''}`}
                    >
                        My List
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
