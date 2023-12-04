import {createBrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import ImportXML from "./views/ImportXML";
import EditArticle from "./components/EditArticle/EditArticle";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/import-xml",
                element: <ImportXML/>
            },
            {
                path:"/navbar",
                element:<Navbar/>
            },
            {
                path: "/editarticle",
                element: <EditArticle/>,
            },
        ],
    }

])

export default router;
