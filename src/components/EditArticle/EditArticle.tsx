import React, {useCallback, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Title} from "../../stylesheets/Fonts";
import {createEditor, first} from "slate";
import {CustomText, Matter} from "../../types";
import AnnotationMenu from "../Editor/Menu/AnnotationMenu";
import useSelection from "../../hooks/useSelection";
import {DefaultElement, Editable, ReactEditor, Slate, withReact} from "slate-react";
import {useRecoilCallback, useRecoilSnapshot, useRecoilValue} from "recoil";
import {getAnnotationsOnTextNode} from "../../utils/EditorAnnotationUtils";
import AnnotatedText from "../Editor/AnnotatedText/AnnotatedText";
import {
    GetLawByIdDocument,
    GetLawByIdQuery, LawFragment, LawFragmentDoc,
    MattersDocument,
    MattersQuery,
    MutationSaveAnnotatedLawArgs,
    RelationSchemaDocument,
    RelationSchemaQuery,
    SaveAnnotatedLawDocument,
    SaveAnnotatedLawMutation,
    SaveMatterRelationSchemaDocument,
    SaveMatterRelationSchemaMutation
} from "../../graphql/api-schema";
import {useMutation, useQuery} from "@apollo/client";
import {annotationIdState, annotationState} from "../../recoil/AnnotationState";
import {useParams} from "react-router-dom";
import useAddAnnotationToState from "../../hooks/useAddAnnotationToState";


type Heading = {
    type: "h1" | "h2" | "h3" | "h4";
    children: CustomText[];
};

type Paragraph = {
    type: "paragraph";
    children: CustomText[];
};

type Descendant = Heading | Paragraph;

const EditArticle = () => {

    const [lawId, setLawId] = useState<string | undefined>();
    const addAnnotation = useAddAnnotationToState();
    const [lawDocument, setLawDocument] = useState<any[]>([]);
    const [lawData, setLawData] = useState<LawFragment|undefined>();

    // Get the relation schema id from the url
    const {id} = useParams();

    useEffect(() => {
        setLawId(id);
    }, [id]);

    const {
        data: queryResult,
        loading: lawLoading,
        refetch: lawRefetch,
        error: lawError
    } = useQuery<GetLawByIdQuery>(GetLawByIdDocument, {
        variables: {
            id: lawId
        }
    });

    const [saveLawMutation, {loading, error}] = useMutation<SaveAnnotatedLawMutation>(
        SaveAnnotatedLawDocument
    );

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

    useEffect(() => {
        if (lawData) {
            const test = lawData.articles.flatMap((article) => {
                    article.annotations.forEach((annotation) => addAnnotation(annotation.id, annotation));
                    if (article.jsonText == null) {
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
                        const test = JSON.parse(article.jsonText);
                        console.log(test[0]);
                        return [
                            {
                                id: article.id,
                                type: "article",
                                children: JSON.parse(article.jsonText)
                            }
                        ]
                    }
                }
            );
            setLawDocument(test);
        }
    }, [lawData]);

    const [annotations, setAnnotations] = useState<any[]>(['']);
    const annotationsIds = useRecoilValue(annotationIdState);// get the ids from the satate

    // make an array of annotations
    const processAnnotations = useRecoilCallback(({snapshot}) => async () => {
        const updatedAnnotations = await Promise.all(
            Array.from(annotationsIds).map(async (id) => {
                const annotation = await snapshot.getPromise(annotationState(id));
                return annotation;
            })
        );
        setAnnotations(updatedAnnotations);
    }, [annotationsIds]);

    useEffect(() => {
        processAnnotations();
    }, [processAnnotations, annotationsIds]);

    const {data} = useQuery<MattersQuery>(MattersDocument)

    const MATTER_COLORS = data?.matters.reduce((acc: any, matter) => {
        acc[matter.name] = {title: matter.name, color: matter.color, id: matter.id}
        return acc;
    }, {});

    const [saveLaw] = useMutation<MutationSaveAnnotatedLawArgs>(SaveAnnotatedLawDocument, {});
    const [matter, setMatter] = React.useState<Matter>({id: '9b112641-7383-4b0b-8550-87cbfc5c16f1', title: 'Rechtsubject', color: '#d7e9f9'});
    const [definition, setDefinition] = React.useState("");
    const [comment, setComment] = React.useState("");

    const [editor] = useState(() => withReact(createEditor()));
    const [selection, setSelection] = useSelection(editor);

    const onChangeHandler = useCallback(
        (document: any) => {
            setLawDocument(document);
            setSelection(editor.selection);
        },
        [editor.selection, setLawDocument, setSelection]
    );

    //convert the typescript array to json string
    const documentAsJson = JSON.stringify(lawDocument, null, 2);

    const saveTheLaw = async () => {
        const articles = [];
        const jsonObjectsArray = JSON.parse(documentAsJson); // convert the json string to json object array
        const articleContentAsJson: JSON[] = [];

        // for (let i = 0; i < jsonObjectsArray.length; i++) {
        //     const currentElement = jsonObjectsArray[i];
        //     const nextElement = jsonObjectsArray[i + 1];
        //
        //     if (currentElement.type === "h2" && nextElement && nextElement.type === "paragraph") {
        //         const title = currentElement.children[0]?.text || "";
        //         const content = nextElement.children
        //             .filter((child: { text?: string; }) => child.text !== undefined);
        //
        //         // Store the JSON objects in jsonObjectArray
        //         articleContentAsJson.push(...content);
        //
        //         // Create a string from the text properties of the children
        //         const contentAsString = content.map((child: { text: string; }) => child.text).join(" ");
        //
        //         articles.push({name: title, content: contentAsString});
        //     }
        // }

        const articlesWithAnnotations = lawDocument.map(({id, children}) => {
            const articleAnnotations = annotations.filter((annotation) => annotation.articleId === id);
            const mappedAnnotations = articleAnnotations.map(({id, definition, comment, text, matter}) => ({tempId: id, text: text, definition: definition, comment: comment, matterId: matter.id}))
            return {articleId: id, jsonText: JSON.stringify(children), annotations: mappedAnnotations};
        });

        saveLawMutation({
            variables: {
                input: {
                    lawId: lawId,
                    isPublished: false,
                    articles: articlesWithAnnotations
                },
            },
        }).then((res) => {
            if (res.data) {
                setLawData(res.data.saveAnnotatedLaw)
            }
        });
    };

    const renderElement = useCallback((props: any) => {
        const {element, children, attributes} = props;
        switch (element.type) {
            case "paragraph":
                return (
                    <p {...attributes} >
                        {children}
                    </p>
                );
            case "h1":
                return <h1 {...attributes}>{children}</h1>;
            case "h2":
                return <h2 {...attributes}>{children}</h2>;
            case "h3":
                return <h3 {...attributes}>{children}</h3>;
            case "h4":
                return <h4 {...attributes}>{children}</h4>;
            default:
                return <DefaultElement {...props}>{children}</DefaultElement>;
        }
    }, [])

    const renderLeaf = (props: any) => {
        const {attributes, children, leaf} = props;
        let el = <>{children}</>;

        if (leaf.bold) {
            el = <strong>{el}</strong>;
        }

        if (leaf.code) {
            el = <code>{el}</code>;
        }

        if (leaf.italic) {
            el = <em>{el}</em>;
        }

        if (leaf.underline) {
            el = <u>{el}</u>;
        }

        const annotationIds = getAnnotationsOnTextNode(leaf);

        if (annotationIds.size > 0) {
            return (
                <AnnotatedText
                    {...attributes}
                    annotations={annotationIds}
                    editor={editor}
                    textNode={leaf}
                >
                    {el}
                </AnnotatedText>
            );
        }

        return <span {...attributes}>{el}</span>;
    }
    return (
        lawLoading ? <p>Wet wordt geladen...</p> : (
            lawDocument.length === 0 ? <p>Geen resultaat...</p> :
                <Box sx={{flexGrow: 1}}>
                    <Grid
                        alignItems="center"
                        justifyContent="end"
                        container>
                        <button onClick={saveTheLaw}>Opslaan</button>
                    </Grid>
                    <Grid
                        alignItems="center"
                        justifyContent="center"
                        container
                    >

                        <h1 style={Title}>{lawData?.title}</h1>
                    </Grid>
                    <Grid container direction={"row"} spacing={5}>
                        <Slate editor={editor} initialValue={lawDocument} onChange={onChangeHandler}>
                            <Grid item lg={4}>
                                <AnnotationMenu selection={selection} setSelection={setSelection} matter={matter}
                                                setMatter={setMatter} definition={definition}
                                                setDefinition={setDefinition}
                                                comment={comment} setComment={setComment} matterColors={MATTER_COLORS}/>
                            </Grid>
                            <Grid item lg={8}>
                                <Editable renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={(e) => {
                                    e.preventDefault()
                                }}/>
                            </Grid>
                            <DebugObserver/>
                        </Slate>
                    </Grid>
                </Box>
        )
    );
};

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
