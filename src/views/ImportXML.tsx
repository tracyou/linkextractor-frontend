import React, { useState } from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
const FileUploader = () => {

    const [artikelen, setArtikelen] = React.useState([
        {
            name: 'Artikel 1',
        },
        {
            name: 'Artikel 2',
        },
        {
            name: 'Artikel 3',
        },
    ]);

    const [file, setFile] = useState<File>();

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        artikelen.push({name:selectedFile.name.toString()})
        console.log(selectedFile)
    }
        
    const showFile = () =>{
        console.log("test")

    }

    return (
        <>

            <div className="importButtonContainer">

                <ImportButton onFileSelect={handleFileSelect} />

            </div>
            <div className="imported-content-container">
                <h1>
                    artikelen
                </h1>

                <div className="artikelen">
                    {artikelen.map((artikel, index) => (
                            <div key={index} className="artikel">
                            <h2 onClick={showFile}>{artikel.name}</h2>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
};

export default FileUploader;
