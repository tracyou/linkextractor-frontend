import React, {ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";  // Adjust the path based on your file structure
import Footer from "../Footer/Footer";
import {Route, Routes} from "react-router-dom";
import ImportXML from "../../views/ImportXML";

const Layout = () => (


    <div>
        <Navbar></Navbar>
        <switch>
            <Routes>
                <Route path="/import-xml" element={<ImportXML/>} />
                <Route path="/navbar" element={<Navbar/>} />
            </Routes>

            {/* Add more routes as needed */}
            {/* <Route path="/some-other-path" component={SomeOtherComponent} /> */}
        </switch>
        <Footer></Footer>
    </div>
);

export default Layout;
