import React, {ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";  // Adjust the path based on your file structure
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";
import './HomePage.css';


const HomePage = () => (
    <div>
        <Navbar></Navbar>

        <h1>Wat is de annotatietool</h1>

        <div id="button">
            <button>Breng me naar de tool</button>
        </div>


        <Footer></Footer>
    </div>
);

export default HomePage;
