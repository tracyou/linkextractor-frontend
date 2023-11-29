import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./react-router";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router}/>
      </header>
    </div>
  );
}

export default App;
