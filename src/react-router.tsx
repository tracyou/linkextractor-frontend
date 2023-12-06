import {createBrowserRouter, redirect} from "react-router-dom";
import path from "path";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import ImportXML from "./views/ImportXML";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/importedArtikels",
                element:<ImportXML></ImportXML>
            }
        ],
    }

])

export default router;