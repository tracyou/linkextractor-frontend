import React, {useEffect, useState} from 'react';
import './RelationSchemaIndex.css';
import {useMutation, useQuery} from "@apollo/client";
import {
    PublishRelationSchemaDocument,
    PublishRelationSchemaMutation,
    RelationSchemasDocument,
    RelationSchemasQuery,
    SaveMatterRelationSchemaDocument,
    SaveMatterRelationSchemaMutation,
    SimpleRelationSchemaFragment,
} from "../../../graphql/api-schema";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import clsx from "clsx";

const RelationSchemaIndex = () => {

    const [loadingRelationSchema, setLoadingRelationSchema] = useState<boolean>(true);
    const [relationSchemas, setRelationSchemas] = useState<readonly SimpleRelationSchemaFragment[]>([]);

    const { data, loading: loadingQuery, refetch: refetchRelationSchemas } = useQuery<RelationSchemasQuery>(RelationSchemasDocument, {
        fetchPolicy: "network-only"
    });

    const [publishRelationSchema, { loading: loadingPublishRelationSchema, error }] = useMutation<PublishRelationSchemaMutation>(
        PublishRelationSchemaDocument
    );

    useEffect(() => {
        if (data) {
            setRelationSchemas(data.relationSchemas);
            setLoadingRelationSchema(false);
        }
    }, [data]);

    const publishSchema = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.stopPropagation();

        try {
            publishRelationSchema({
                variables: {
                    id: id
                }
            }).then(() => {
                refetchRelationSchemas();
            });

        } catch (error) {
            console.error('Error publishing schema:', error);
        }
    };

    const redirectToDetail = (id: string | null) => {
        window.location.href = id ? `/relation-schemas/${id}` : '/relation-schemas/new'
    }

    return (
        <div>
            {
                loadingRelationSchema ? <p>Loading...</p> : (
                    <div className={clsx("d-flex", "flex-column", "gap-4")}>
                        <Grid
                            alignItems="center"
                            justifyContent="space-between"
                            container>
                            <h2>Relation Schemas</h2>
                            <Button variant={"contained"}
                                        color={"success"}
                                        size={"large"}
                                        onClick={() => redirectToDetail(null)}>Nieuw
                            </Button>
                        </Grid>

                        <div className={clsx("d-flex", "flex-column", "gap-2")}>
                            {relationSchemas.map(schema =>
                                <table key={schema.id}>
                                    <tbody>
                                        <tr className={"schema"} onClick={() => redirectToDetail(schema.id)}>
                                            <td className={clsx("d-flex w-75")}>
                                                <div className={"active-indicator"}></div>
                                                <span>{schema.updatedAt} - {schema.expiredAt ?? 'Now'}</span>
                                            </td>
                                            <td  className={clsx("d-flex w-25 justify-content-end")}>
                                                <span>{schema.isPublished ? schema.expiredAt ? 'Gepubliceerd' : 'Actief' : (
                                                    <Button variant={"contained"}
                                                            color={"primary"}
                                                            size={"small"}
                                                            onClick={(e) => publishSchema(e, schema.id)}
                                                    >Publiceer
                                                    </Button>
                                                )}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default RelationSchemaIndex;
