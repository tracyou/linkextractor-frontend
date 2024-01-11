import React, {useCallback, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Title} from "../../stylesheets/Fonts";
import {createEditor} from "slate";
import {Matter} from "../../types";
import AnnotationMenu from "../Editor/Menu/AnnotationMenu";
import useSelection from "../../hooks/useSelection";
import {DefaultElement, Editable, ReactEditor, Slate, withReact} from "slate-react";
import {useRecoilCallback, useRecoilSnapshot, useRecoilValue} from "recoil";
import {getAnnotationsOnTextNode} from "../../utils/EditorAnnotationUtils";
import AnnotatedText from "../Editor/AnnotatedText/AnnotatedText";
import {
    GetLawByIdDocument,
    GetLawByIdQuery,
    MattersDocument,
    MattersQuery,
    MutationSaveAnnotatedLawArgs, RelationSchemaDocument, RelationSchemaQuery,
    SaveAnnotatedLawDocument
} from "../../graphql/api-schema";
import {useMutation, useQuery} from "@apollo/client";
import {annotationIdState, annotationState} from "../../recoil/AnnotationState";
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";

type CustomElement = { type: string; children: CustomText[] }
type CustomText = { text: string, bold?: boolean, italic?: boolean, code?: boolean, underline?: boolean }

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

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

    const [lawDocument, setLawDocument] = useState<Descendant[]>([]);

    // Get the relation schema id from the url
    const {id} = useParams();

    useEffect(() => {
        setLawId(id);
    }, [id]);

    const {
        data: lawData,
        loading: lawLoading,
        refetch: lawRefetch,
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

        if (lawData) {
            setLawDocument(lawData!.law.articles.flatMap((article) => [
                {
                    type: "h4",
                    children: [{text: article.title}],
                },
                {
                    type: "paragraph",
                    children: [
                        {text: article.text || ''}, // Make sure text is defined or provide a default value
                    ],
                },
            ]));
        }
    }, [lawData, lawLoading, lawError]);

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
        acc[matter.name] = matter.color;
        return acc;
    }, {});

    const [saveLaw] = useMutation<MutationSaveAnnotatedLawArgs>(SaveAnnotatedLawDocument, {});

    const [matter, setMatter] = React.useState<Matter>({title: "Afleidingsregel", color: "#d47478"});
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

        for (let i = 0; i < jsonObjectsArray.length; i++) {
            const currentElement = jsonObjectsArray[i];
            const nextElement = jsonObjectsArray[i + 1];

            if (currentElement.type === "h2" && nextElement && nextElement.type === "paragraph") {
                const title = currentElement.children[0]?.text || "";
                const content = nextElement.children
                    .filter((child: { text?: string; }) => child.text !== undefined);

                // Store the JSON objects in jsonObjectArray
                articleContentAsJson.push(...content);

                // Create a string from the text properties of the children
                const contentAsString = content.map((child: { text: string; }) => child.text).join(" ");

                articles.push({name: title, content: contentAsString});
            }
        }

        try {
            await saveLaw({
                variables: {
                    input: {
                        lawId: lawId,
                        isPublished: false,
                        articles: articles, // TODO: Create a mapping to an array of objects that contain all the mandator input parameters:
                        // - [{ articleId, jsonText, annotations : [{ text, matterId, definition, comment }] }]
                    },
                },
            });
        } catch (error) {
            console.error('Error saving law:', error);
        }
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

                    <h1 style={Title}>{lawData?.law.title}</h1>
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
