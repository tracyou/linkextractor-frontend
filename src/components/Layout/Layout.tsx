import React from 'react';
import Navbar from "../Navbar/Navbar";  // Adjust the path based on your file structure
import Footer from "../Footer/Footer";
import {Route, Routes} from "react-router-dom";
import ImportXML from "../../views/ImportXML";
import './Layout.css'
import EditArticle from "../EditArticle/EditArticle";
import TextAnnotator from "../TextAnnotator/TextAnnotator";

const Layout = () => (


    <div>
        <div className="layout-container">

            <Navbar></Navbar>
            <switch>
                <div className="content-area">

                    <Routes>
                        <Route path="/import-xml" element={<ImportXML/>}/>
                        <Route path="/navbar" element={<Navbar/>}/>
                        <Route path="/editarticle" element={<EditArticle/>}/>
                        <Route path="/annotate" element={<TextAnnotator/>}/>
                    </Routes>
                </div>

            </switch>
            <Footer></Footer>
        </div>

    </div>
);

export default Layout;
