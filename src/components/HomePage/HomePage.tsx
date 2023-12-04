import React, {ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";  // Adjust the path based on your file structure
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";


const HomePage = () => (
    <div>
        <Navbar></Navbar>

        <p>Wat is de annotatietool</p>

        <Footer></Footer>
    </div>
);

export default HomePage;
