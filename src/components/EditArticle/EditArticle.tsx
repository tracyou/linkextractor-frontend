import React, {useCallback, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Title} from "../../stylesheets/Fonts";
import {createEditor} from "slate";
import AnnotationMenu from "../Editor/Menu/AnnotationMenu";
import useSelection from "../../hooks/useSelection";
import {Editable, Slate, withReact} from "slate-react";
import {useRecoilSnapshot, useRecoilValue} from "recoil";
import {
    GetLawByIdDocument,
    GetLawByIdQuery,
    LawFragment, MattersDocument, MattersQuery,
    SaveAnnotatedLawDocument,
    SaveAnnotatedLawMutation,
    SimpleAnnotationFragment, SimpleMatterFragment
} from "../../graphql/api-schema";
import {useMutation, useQuery} from "@apollo/client";
import {allArticlesState} from "../../recoil/AnnotationState";
import {useParams} from "react-router-dom";
import useAddAnnotationToState from "../../hooks/useAddAnnotationToState";
import useClearAnnotationState from "../../hooks/useClearAnnotationsState";
import useEditorConfig from "../../hooks/useEditorConfig";
import useAddArticleToState from "../../hooks/useAddArticleToState";
import useClearArticleState from "../../hooks/useClearArticleState";
import {Alert, Button, Snackbar} from "@mui/material";

const EditArticle = () => {

    const [lawId, setLawId] = useState<string | undefined>();
    const [lawData, setLawData] = useState<LawFragment | undefined>();
    const [lawDocument, setLawDocument] = useState<any[]>([]);
    const {id} = useParams();

    useEffect(() => {
        setLawId(id);
    }, [id]);

    const {
        data: queryResult,
        loading: lawLoading,
        error: lawError
    } = useQuery<GetLawByIdQuery>(GetLawByIdDocument, {
        variables: {
            id: lawId
        }
    });

    useEffect(() => {
        if (lawError) {
            if (lawError.graphQLErrors.some((error) => {
                if (!error.extensions.validation) return false;

                // @ts-ignore
                return error.extensions.validation.id.includes('The selected id is invalid.')
            })) {
                window.location.href = '/import-xml';
            }
        }
    }, [lawError]);

    useEffect(() => {
        if (lawLoading) {
            return
        }

        if (queryResult?.law) {
            setLawData(queryResult.law);
        }
    }, [lawLoading]);

    const {data: matterQueryResult, loading: mattersLoading}
        = useQuery<MattersQuery>(MattersDocument)
    const [matter, setMatter]
        = React.useState<SimpleMatterFragment>();
    const [mattersByName, setMattersByName]
        = React.useState<Record<string, SimpleMatterFragment>>();

    useEffect(() => {
        if (mattersLoading) {
            return
        }

        if (matterQueryResult?.matters) {
            const matters: Record<string, SimpleMatterFragment>
                = matterQueryResult?.matters.reduce((acc: any, matter) => {
                acc[matter.name] = {name: matter.name, color: matter.color, id: matter.id}
                return acc;
            }, {});

            setMattersByName(matters);
            setMatter(matters[Object.keys(matters)[0]]);
        }
    }, [mattersLoading]);

    const [editor] = useState(() => withReact(createEditor()));
    const addAnnotation = useAddAnnotationToState();
    const clearAnnotations = useClearAnnotationState();
    const addArticle = useAddArticleToState();
    const clearArticles = useClearArticleState();
    const [selection, setSelection] = useSelection(editor);

    const onChangeHandler = useCallback(
        (document: any) => {
            setLawDocument(document);
            setSelection(editor.selection);
        },
        [editor.selection, lawData, setSelection]
    );

    useEffect(() => {
        if (lawData) {
            const mappedDocument = lawData.articles.flatMap((article) => {
                    //Store each annotation in global context
                    clearAnnotations().then(() => article.revision?.annotations.forEach((annotation) => addAnnotation(annotation.id, annotation, editor)));
                    //Store each article in global context
                    clearArticles().then(() => addArticle(article.id, article));
                    //If there is no JSON yet, parse imported text to proper JSON format
                    if (!article.revision) {
                        return [
                            {
                                id: article.id,
                                type: "article",
                                children: [
                                    {
                                        type: "h4",
                                        children: [{text: article.title}],
                                    },
                                    {
                                        type: "paragraph",
                                        children: [
                                            {text: article.text || ''}, // Make sure text is defined or provide a default value
                                        ],
                                    }]
                            },
                        ]
                    } else {
                        return [
                            {
                                id: article.id,
                                type: "article",
                                children: JSON.parse(article.revision.jsonText)
                            }
                        ]
                    }
                }
            );
            setLawDocument(mappedDocument);
            editor.children = mappedDocument;
        }
    }, [lawData]);

    const [saveLawMutation] = useMutation<SaveAnnotatedLawMutation>(
        SaveAnnotatedLawDocument
    );

    const allArticles = useRecoilValue(allArticlesState);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const saveTheLaw = async () => {

        const articlesWithAnnotations = lawDocument.map(({id, children}) => {
            //For each article in lawDocument get annotations array from state by id
            const article = allArticles.find((article) => article!.id == id);

            const transformedAnnotations = article!.revision?.annotations.map((annotation: SimpleAnnotationFragment) => {
                const {
                    id,
                    text,
                    definition,
                    comment,
                    matter
                } = annotation;

                return {
                    tempId: id,
                    text: text,
                    definition: definition,
                    comment: comment,
                    matterId: matter.id
                }
            })

            return {
                articleId: id,
                jsonText: JSON.stringify(children), // Make sure to use children from the document, not from the state
                annotations: transformedAnnotations || [],
            };

        })

        saveLawMutation({
            variables: {
                input: {
                    lawId: lawId,
                    isPublished: false,
                    articles: articlesWithAnnotations
                },
            },
        }).then((res) => {
            if (res.errors) {
                const errors = res.errors.map((e) => e.message);
                setErrorMessages(errors);
            }
            if (res.data) {
                setLawData(res.data.saveAnnotatedLaw)
                setIsSuccess(true);
            }
        });
    };

    const {renderLeaf, renderElement} = useEditorConfig(editor);

    return (
        mattersLoading || lawLoading ? <p>Wet wordt geladen...</p> : (
            !matter || !mattersByName || lawDocument.length === 0 ? <p>Geen resultaat...</p> :
                <>
                    <Snackbar open={isSuccess} autoHideDuration={6000} onClose={() => setIsSuccess(false)}>
                        <Alert
                            onClose={() => setIsSuccess(false)}
                            severity="success"
                            variant="filled"
                            sx={{width: '100%', alignItems: "center"}}
                        >
                            Wet opgeslagen
                        </Alert>
                    </Snackbar>
                    <Snackbar open={errorMessages.length != 0} autoHideDuration={6000}
                              onClose={() => setErrorMessages([])}>
                        <Alert
                            onClose={() => setErrorMessages([])}
                            severity="warning"
                            variant="filled"
                            sx={{width: '100%', alignItems: "center"}}
                        >
                            {errorMessages[0]}
                        </Alert>
                    </Snackbar>
                    <Box sx={{flexGrow: 1}}>
                        <Grid
                            alignItems="center"
                            justifyContent="end"
                            container>
                            <Button variant={"contained"} style={{marginTop: "2%"}} onClick={saveTheLaw}>Wet opslaan</Button>
                        </Grid>
                        <Grid container direction={"row"} spacing={5}>
                            <Slate editor={editor} initialValue={lawDocument} onChange={onChangeHandler}>
                                <Grid item lg={5}>
                                    <AnnotationMenu
                                        selection={selection}
                                        setSelection={setSelection}
                                        matter={matter} setMatter={setMatter}
                                        mattersByName={mattersByName}
                                    />
                                </Grid>
                                <Grid item lg={7}>
                                    <h1 style={Title}>{lawData?.title}</h1>
                                    <Editable renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}/>
                                </Grid>
                                <DebugObserver/>
                            </Slate>
                        </Grid>
                    </Box>
                </>
        )
    );
};

//For debugging purposes, prints state whenever any atom changes
function DebugObserver() {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
        console.debug('The following atoms were modified:');
        for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
            console.debug(node.key, snapshot.getLoadable(node));
        }
    }, [snapshot]);

    return null;
}


export default EditArticle;
