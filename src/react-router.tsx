import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import {createBrowserRouter} from "react-router-dom";
import EditArticle from "./components/EditArticle/EditArticle";
import React from 'react';

const router = createBrowserRouter([
    {
        path: "/editarticle",
        element: <EditArticle/>,
    },
    {
        path: "/",
        element: <Layout/>,
        children: [{
            element: <Navbar/>
        },
            {
                element: <Footer/>
            }]//name of the view page or component
    }

])
export default router;
