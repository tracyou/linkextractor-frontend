import {createBrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import ImportXML from "./views/ImportXML";
import EditArticle from "./components/EditArticle/EditArticle";
import React from "react";
import TextAnnotator from "./components/TextAnnotator/TextAnnotator";
import HomePage from "./components/HomePage/HomePage";
import ApiDemo from "./components/ApiDemo/ApiDemo";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: "import-xml",
                element: <ImportXML/>
            },
            {
                path:"navbar",
                element:<Navbar/>
            },
            {
                path: "editarticle",
                element: <EditArticle/>,
            },
            {
                path: "annotate",
                element: <TextAnnotator/>,
            },
            {
                path: "test",
                element: <ApiDemo/>,
            }
        ],
    }
])

export default router;
