import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./react-router";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    return (
        <>
            <CssBaseline enableColorScheme={true}/>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
