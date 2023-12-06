import React, {ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";  // Adjust the path based on your file structure
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";
import ImportXML from "../../views/ImportXML";


const Layout = () => (
    <div>
        <Navbar></Navbar>
                <ImportXML></ImportXML>
        <Footer></Footer>
    </div>
);

export default Layout;
