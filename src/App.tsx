import React from 'react';
import './App.css';
import {Outlet, RouterProvider} from "react-router-dom";
import router from "./react-router";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
