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
    ImportXmlMutation,
    useGetAllLawsQuery,
    useImportXmlMutation
} from "../graphql/api-schema";


const ImportXML = () => {

    const {data, loading, error} = useGetAllLawsQuery();
    const [importXmlMutation, {
        data: importData,
        error: importEror
    }] = useMutation<ImportXmlMutation>(ImportXmlDocument);



    const handleFileSelect = async (selectedFile: File) => {
        console.log(selectedFile)
            try {
                console.log(selectedFile)
                const response = await importXmlMutation({
                    variables: {
                        file: selectedFile //[selectedFile.name,selectedFile.type,selectedFile.webkitRelativePath]
                    }
                });

                console.log('File uploaded successfully', response);
            } catch (error) {
                console.error('Error uploading file', error);
            }

    }

    const handleOnClick = () => {

        window.location.href = '/editarticle';

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
                        {data?.laws.map((law, id) => (

                            <div key={id} className="artikel" onClick={handleOnClick}>
                                <h2>{law.title}</h2>
                            </div>
                        ))}
                    </div>
                </Grid>
            </div>
        </>
    );
};

export default ImportXML;
