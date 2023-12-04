import {createBrowserRouter, redirect} from "react-router-dom";
import path from "path";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";

const router = createBrowserRouter([
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