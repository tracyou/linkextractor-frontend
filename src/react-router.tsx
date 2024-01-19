import {createBrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import ImportXML from "./views/ImportXML";
import React from "react";
import ApiDemo from "./components/ApiDemo/ApiDemo";
import RelationSchemaIndex from "./components/RelationSchema/Index/RelationSchemaIndex";
import RelationSchemaDetail from "./components/RelationSchema/Detail/RelationSchemaDetail";
import RevisionSelector from "./components/RevisonSelector/RevisionSelector";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <ImportXML/>
            },
            {
                path:"navbar",
                element:<Navbar/>
            },
            {
                path: "revisionselector/:id",
                element: <RevisionSelector/>,
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
