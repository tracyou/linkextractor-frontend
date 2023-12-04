import {createBrowserRouter} from "react-router-dom";
import EditArticle from "./components/EditArticle/EditArticle";
import React  from 'react';

const router = createBrowserRouter([
    {
        path:"/editarticle",
        element:<EditArticle/>,
    },
    {
        path:"/",
        element:""//name of the view page or component
    },

])

export default router;
