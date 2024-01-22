import React, {Suspense} from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./react-router";
import CssBaseline from '@mui/material/CssBaseline';
import {RecoilRoot} from "recoil";

function App() {
    return (
        <Suspense fallback={<div>Loading... </div>}>
        <RecoilRoot>
            <CssBaseline enableColorScheme={true}/>
            <RouterProvider router={router}/>
        </RecoilRoot>
        </Suspense>
    );
}

export default App;
