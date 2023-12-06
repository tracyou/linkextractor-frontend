import React, {ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";  // Adjust the path based on your file structure
import Footer from "../Footer/Footer";
import {Route, Routes} from "react-router-dom";
import ImportXML from "../../views/ImportXML";
import './Layout.css'

const Layout = () => (


    <div>
        <div className="layout-container">

            <Navbar></Navbar>
            <switch>
                <div className="content-area">

                    <Routes>
                        <Route path="/import-xml" element={<ImportXML/>}/>
                        <Route path="/navbar" element={<Navbar/>}/>
                    </Routes>
                </div>

            </switch>
            <Footer></Footer>
        </div>

    </div>
);

export default Layout;
