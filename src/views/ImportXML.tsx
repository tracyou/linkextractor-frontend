import React, {useEffect, useState} from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
import {Title} from "../stylesheets/Fonts";
import Grid from "@mui/material/Grid";
import {
    SimpleLawFragment, useGetLawsQuery
} from "../graphql/api-schema";
import {useMutation} from "@apollo/client";
import {ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables, useMutation} from "@apollo/client";
import {
    ImportXmlDocument,
    ImportXmlMutation,
    DeleteLawDocument, DeleteLawInput,
    DeleteLawMutation,
    ImportXmlDocument,
    ImportXmlMutation,
    SimpleLawFragment,
    useGetAllLawsQuery
} from "../graphql/api-schema";
import {Button} from "@mui/material";
import {UUID} from "node:crypto";


const ImportXML = () => {
    const {data, loading, error, refetch} = useGetLawsQuery();
    const [importXmlMutation, {
        data: importData,
        error: importEror
    }] = useMutation<ImportXmlMutation>(ImportXmlDocument);

    const [file, setFile] = useState<File>();

    const [deleteLaw, {loading: loadingDelete, error: errorDelete}] = useMutation<DeleteLawMutation>(
        DeleteLawDocument);

    useEffect(() => {
        refetch()
    }, [file]);

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

    function onDeleteLaw(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, id: UUID) {
        e.stopPropagation();

        const input: DeleteLawInput = {
            id: id,
        };

        deleteLaw( {
            variables: {
                input: input
            },
        })
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
                                        <Button variant={"contained"}
                                                color={"primary"}
                                                size={"small"}
                                                onClick={(e) => {
                                                    const id: any = law.id;
                                                    onDeleteLaw(e, id);
                                                }}
                                        >Delete
                                        </Button>
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
