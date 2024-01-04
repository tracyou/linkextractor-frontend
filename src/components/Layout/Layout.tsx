import React from 'react';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Route, Routes} from "react-router-dom";
import ImportXML from "../../views/ImportXML";
import './Layout.css'
import EditArticle from "../EditArticle/EditArticle";
import HomePage from "../HomePage/HomePage";
import TextAnnotator from "../TextAnnotator/TextAnnotator";
import ApiDemo from "../ApiDemo/ApiDemo";
import RelationSchemaIndex from "../RelationSchema/Index/RelationSchemaIndex";
import RelationSchemaDetail from "../RelationSchema/Detail/RelationSchemaDetail";

const Layout = () => {

    return (
        <div>
            <div className="layout-container">

            <Navbar></Navbar>
            <switch>
                <div className="content-area">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/import-xml" element={<ImportXML/>}/>
                        <Route path="/navbar" element={<Navbar/>}/>
                        <Route path="/editarticle" element={<EditArticle/>}/>
                        <Route path={"/test"} element={<ApiDemo/>}/>
                        <Route path={"/relation-schemas"} element={<RelationSchemaIndex/>}/>
                        <Route path={"/relation-schemas/:id"} element={<RelationSchemaDetail/>}/>
                        <Route path={"/relation-schemas/new"} element={<RelationSchemaDetail/>}/>
                    </Routes>
                </div>

                </switch>
                <Footer></Footer>
            </div>
        </div>
    )
};
export default Layout;
