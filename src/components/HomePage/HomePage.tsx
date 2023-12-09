import React, {ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";  // Adjust the path based on your file structure
import Footer from "../Footer/Footer";
import {Outlet, redirect} from "react-router-dom";
import './HomePage.css';
import '../../views/ImportXML.css'


const handleClick = () => {
    window.location.href = '/import-xml';
};
const HomePage = () => (


    <div className='importButtonContainer'>
        <h1>Wat is de annotatietool</h1>

        <div id="button" >
            <button onClick={handleClick}>Breng me naar de tool</button>
        </div>

    </div>
);

export default HomePage;
