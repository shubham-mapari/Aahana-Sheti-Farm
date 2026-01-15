import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary-green)' }}>
                    <img src={process.env.PUBLIC_URL + '/assets/logo.jpg'} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="logo-text" style={{ fontSize: '1.1rem' }}>आहाना ॲडमिन</span>
            </div>

            <nav className="nav-links">
                <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
                    <span className="nav-icon">📊</span>
                    <span>मुख्य (Home)</span>
                </Link>

                <Link to="/add-work" className={`nav-item ${isActive('/add-work')}`}>
                    <span className="nav-icon">🚜</span>
                    <span>काम (Work)</span>
                </Link>

                <Link to="/search-farmer" className={`nav-item ${isActive('/search-farmer')}`}>
                    <span className="nav-icon">👥</span>
                    <span>शेतकरी</span>
                </Link>


                <div style={{ marginTop: 'auto', padding: '1rem' }}>
                    <Link to="/" className="nav-item">
                        <span className="nav-icon">🏠</span>
                        <span>वेबसाईटवर जा</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
