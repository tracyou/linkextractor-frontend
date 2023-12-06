import React, { useState } from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
const ImportXML = () => {

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
        }


    return (
        <>

            <div className="importButtonContainer">

                <ImportButton onFileSelect={handleFileSelect} />

            </div>
            <div className="imported-content-container">
                <h1>
                    Artikelen
                </h1>

                <div className="artikelen">
                    {artikelen.map((artikel, index) => (
                            <div key={index} className="artikel">
                            <h2>{artikel.name}</h2>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
};

export default ImportXML;