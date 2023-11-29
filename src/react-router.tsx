import {createBrowserRouter, redirect} from "react-router-dom";
import path from "path";
import Navbar from "./components/Navbar/Navbar";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Navbar/>//name of the view page or component
    }

])

export default router;