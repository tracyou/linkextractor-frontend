import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./react-router";
import CssBaseline from '@mui/material/CssBaseline';
import {RecoilRoot} from "recoil";

function App() {
    return (
        <RecoilRoot>
            <CssBaseline enableColorScheme={true}/>
            <RouterProvider router={router}/>
        </RecoilRoot>
    );
}

export default App;
