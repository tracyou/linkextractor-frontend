import {createBrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import ImportXML from "./views/ImportXML";
import EditArticle from "./components/EditArticle/EditArticle";
import React from "react";
import TextAnnotator from "./components/TextAnnotator/TextAnnotator";
import HomePage from "./components/HomePage/HomePage";
import ApiDemo from "./components/ApiDemo/ApiDemo";
import RelationSchemaIndex from "./components/RelationSchema/Index/RelationSchemaIndex";
import RelationSchemaDetail from "./components/RelationSchema/Detail/RelationSchemaDetail";
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
                path: "editarticle/:id",
                element: <EditArticle/>,
            },
            {
                path: "annotate",
                element: <TextAnnotator/>,
            },
            {
                path: "test",
                element: <ApiDemo/>,
            },
            {
                path: "/relation-schemas",
                element: <RelationSchemaIndex/>,
            },
            {
                path: "/relation-schemas/:id",
                element: <RelationSchemaDetail/>,
            },
            {
                path: "/relation-schemas/new",
                element: <RelationSchemaDetail/>,
            },
        ],
    }
])

export default router;
