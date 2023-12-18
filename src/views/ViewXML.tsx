import React, {useState} from "react";
import Footer from "../components/Footer/Footer";
import ImportButton from "../components/ImportButton/ImportButton";
import Navbar from "../components/Navbar/Navbar";

const ViewXML = (props:{ name: any; data: string; }) => {


    return (
        <>
            <h1>{props.name}</h1>
            <div>
                {props.data}
            </div>
        </>
    );
};

export default ViewXML;
