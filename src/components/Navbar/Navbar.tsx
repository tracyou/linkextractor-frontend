// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
    <>
        <div className="logoContainer">
            <img src={require('../../imgs/logo.png')} alt="Logo" />
        </div>
        <div className="nav">
            <nav>
                <ul>
                    <li className="active">
                        <Link to="/relation-schemas">Relation Schemas</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </>
);

export default Navbar;
