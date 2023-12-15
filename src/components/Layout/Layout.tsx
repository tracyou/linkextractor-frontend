import React from 'react';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Route, Routes} from "react-router-dom";
import ImportXML from "../../views/ImportXML";
import './Layout.css'
import EditArticle from "../EditArticle/EditArticle";

const Layout = () => {

    return (
        <div>
            <div className="layout-container">

            <Navbar></Navbar>
            <switch>
                <div className="content-area">
                    <Routes>
                        <Route path="/import-xml" element={<ImportXML/>}/>
                        <Route path="/navbar" element={<Navbar/>}/>
                        <Route path="/editarticle" element={<EditArticle/>}/>
                    </Routes>
                </div>
                </switch>
                <Footer></Footer>
            </div>
        </div>
    )
};
export default Layout;
