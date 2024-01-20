import React, {useEffect, useState} from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
import DeleteButton from "../components/DeleteButton/DeleteButton";
import {Title} from "../stylesheets/Fonts";
import Grid from "@mui/material/Grid";
import {
    useGetLawsQuery
} from "../graphql/api-schema";
import {useMutation} from "@apollo/client";
import {
    ImportXmlDocument,
    ImportXmlMutation,
    DeleteLawDocument,
    DeleteLawMutation,
    SimpleLawFragment,
} from "../graphql/api-schema";

const ImportXML = () => {
    const {data, loading, error, refetch} = useGetLawsQuery();
    const [importXmlMutation, {
        data: importData,
        error: importEror
    }] = useMutation<ImportXmlMutation>(ImportXmlDocument);

    const [file, setFile] = useState<File>();

    const [deleteLaw, {data: dataDelete, loading: loadingDelete, error: errorDelete}] = useMutation<DeleteLawMutation>(
        DeleteLawDocument);

    useEffect(() => {
        refetch()
    }, [file, dataDelete]);

    const handleFileSelect = async (selectedFile: File) => {
        try {
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
        window.location.href = '/revisionselector/' + law.id;
    }

    async function handleOnDelete(event: React.MouseEvent, id: string) {

        event.stopPropagation();

        const shouldDelete = window.confirm('Are you sure you want to delete?');

        if (!shouldDelete) {
            return;
        }

        try {
            await deleteLaw({
                variables: {
                    input: id
                },
            });
        } catch (error) {
            console.log('er is iets fouts gegaan', error)
        }
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
                    <div className="artikelen">
                        {loading ? 'Wetten laden....' : (
                            <div className="artikelen">
                                {data?.laws.map((law) => (

                                    <div key={law.id} className="artikel" onClick={() => handleOnClick(law)}>
                                        <h2> {law?.title}</h2>
                                        <Grid
                                            alignItems="right"
                                            justifyContent="right"
                                            container>
                                            <DeleteButton onClick={(event) => handleOnDelete(event, law?.id)}/>
                                        </Grid>
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
