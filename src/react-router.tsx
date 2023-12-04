import {createBrowserRouter, redirect} from "react-router-dom";
import React, { Component }  from 'react';
import path from "path";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
        // ,
        // children: [{
        //     element: <Navbar/>
        // },
        //     {
        //         element: <Footer/>
        //     }]//name of the view page or component
    }

])

export default router;
