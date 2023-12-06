import {createBrowserRouter, redirect} from "react-router-dom";
import React, { Component }  from 'react';
import path from "path";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
// import HomePage from "./components/HomePage/HomePage";
import ImportXML from "./views/ImportXML";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/import-xml",
                element:<ImportXML></ImportXML>
            },
            {
                path:"/navbar",
                element:<Navbar></Navbar>
            }
        ],
    }

])

export default router;
