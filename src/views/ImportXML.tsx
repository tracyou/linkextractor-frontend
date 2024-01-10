import React, {SetStateAction, useState} from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
import ViewXML from "./ViewXML";
import {Title} from "../stylesheets/Fonts";
import Grid from "@mui/material/Grid";
import {
    GetLawsDocument,
    GetLawsQuery,
    RelationSchemasDocument,
    RelationSchemasQuery,
    SimpleLawFragment
} from "../graphql/api-schema";
import {useQuery} from "@apollo/client";


const ImportXML = () => {

    const [fileContent, setFileContent] = useState("")

    const {data, loading} = useQuery<GetLawsQuery>(GetLawsDocument);

    const [file, setFile] = useState<File | null>();
    const [viewXML, setViewXML] = useState<SetStateAction<any>>();

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        // laws.push({name: selectedFile.name.toString()})

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

    const handleOnClick = (law: SimpleLawFragment) => {

        window.location.href = '/editarticle/' + law.id;

    }


    return (
        <>
            <div className="imported-content-container">
                <h1 style={Title}>
                    Wetten
                </h1>
                <Grid
                    alignItems="right"
                    justifyContent="right"
                    container>
                    <ImportButton onFileSelect={handleFileSelect}/>
                </Grid>
                <Grid>
                    {loading ? 'Wetten laden....' : (
                        <div className="artikelen">
                            {data?.laws.map((law) => (

                                <div key={law.id} className="artikel" onClick={() => handleOnClick(law)} >
                                    < h2 > {law?.title}</h2>
                                    </div>
                                    ))}
                                </div>
                                )}

                        </Grid>
                        </div>
                        </>
                        );
                    };

export default ImportXML;
