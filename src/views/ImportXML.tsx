import React, {useState} from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
import ViewXML from "./ViewXML";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {
    SetStateAction
} from "../../../../../../../../../Program Files/JetBrains/IntelliJ IDEA 2022.2.1/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";

const ImportXML = () => {


    const [fileContent, setFileContent] = useState("")

    const [artikelen, setArtikelen] = useState([
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
    const [viewXML, setViewXML] = useState<SetStateAction<any>>();

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        artikelen.push({name: selectedFile.name.toString()})

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setFileContent(content)//save the file content inthe variable to be used later
                setViewXML(<ViewXML name={selectedFile.name} data={content}/>);
            };
            reader.readAsText(selectedFile);//read the file content
        }
    }




    return (
        <>
            <Navbar></Navbar>
            <div className="importButtonContainer">

                <ImportButton onFileSelect={handleFileSelect}/>

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
                {viewXML}
            </div>
            <Footer></Footer>
        </>
    );
};

export default ImportXML;
