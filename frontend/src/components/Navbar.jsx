import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">♻️ E-Waste Forecaster</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/')}`} to="/">Dashboard & Map</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/forecast')}`} to="/forecast">Predictions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/upload')}`} to="/upload">Upload Data</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
