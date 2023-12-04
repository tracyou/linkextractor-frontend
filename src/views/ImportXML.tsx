import React, { useState } from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
const FileUploader = () => {

    const [artikelen, setArtikelen] = React.useState([
        {
            naam: 'Artikel 1',
        },
        {
            naam: 'Artikel 2',
        },
        {
            naam: 'Artikel 3',
        },
    ]);

    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        // Do something with the file, e.g., read its content
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                console.log(content);
            };

            reader.readAsText(selectedFile);
            artikelen.push({naam:selectedFile.name.toString()})
        }
    };



    return (
        <>

            <div className="importButtonContainer">

                <ImportButton onFileSelect={handleFileSelect} />

            </div>
            <div className="imported-content-container">
                <h1>
                    artieklen
                </h1>

                <div className="artikelen">
                    {artikelen.map((artikel, index) => (
                            <div key={index} className="artikel">
                            <h2>{artikel.naam}</h2>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
};

export default FileUploader;