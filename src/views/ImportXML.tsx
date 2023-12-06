import React, {useState} from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";

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

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        artikelen.push({name: selectedFile.name.toString()})

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setFileContent(content)//save the file content inthe variable to be used later
            };
            reader.readAsText(selectedFile);//read the file content
        }
    }


    return (
        <>

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
                {fileContent.toString()}
            </div>


        </>
    );
};

export default ImportXML;