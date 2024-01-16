import React, {SetStateAction, useEffect, useState} from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
import ViewXML from "./ViewXML";
import {Title} from "../stylesheets/Fonts";
import Grid from "@mui/material/Grid";
import {useMutation, useQuery} from "@apollo/client";
import {
    GetAllLawsDocument,
    GetAllLawsQuery, ImportXmlDocument,
    ImportXmlMutation, SimpleLawFragment,
    useGetAllLawsQuery,
    useImportXmlMutation
} from "../graphql/api-schema";


const ImportXML = () => {

    const {data, loading, error, refetch} = useGetAllLawsQuery();
    const [importXmlMutation, {
        data: importData,
        error: importEror
    }] = useMutation<ImportXmlMutation>(ImportXmlDocument);

    const [file, setFile] = useState<File>();


    useEffect(() => {
        refetch()
    }, [file]);

    const handleFileSelect = async (selectedFile: File) => {

        try {
            console.log(selectedFile)
            const response = await importXmlMutation({
                variables: {
                    file: selectedFile
                },
            });
            console.log('File uploaded successfully', response);
        } catch (error) {
            console.error('Error uploading file', error);
        }
        setFile(selectedFile)

    }

    const handleOnClick = (law: SimpleLawFragment) => {

        window.location.href = '/editarticle/' + law.id;

    }


    return (
        <>
            <div className="imported-content-container">
                <h1 style={Title}>
                    Artikelen
                </h1>
                <Grid
                    alignItems="right"
                    justifyContent="right"
                    container>
                    <ImportButton onFileSelect={handleFileSelect}/>
                </Grid>
                <Grid>
                    <div className="artikelen">
                        {loading ? 'Wetten laden....' : (
                            <div className="artikelen">
                                {data?.laws.map((law) => (

                                    <div key={law.id} className="artikel" onClick={() => handleOnClick(law)}>
                                        < h2> {law?.title}</h2>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </Grid>
            </div>
        </>
    );
};

export default ImportXML;
