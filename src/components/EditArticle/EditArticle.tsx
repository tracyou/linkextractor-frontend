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
    MattersDocument,
    MattersQuery,
    MutationSaveAnnotatedLawArgs,
    SaveAnnotatedLawDocument
} from "../../graphql/api-schema";
import {useMutation, useQuery} from "@apollo/client";
import {annotationIdState, annotationState} from "../../recoil/AnnotationState";
import {Button} from "@mui/material";

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
    type: "h1" | "h2";
    children: CustomText[];
};

type Paragraph = {
    type: "paragraph";
    children: CustomText[];
};

type Descendant = Heading | Paragraph;

const EditArticle = () => {
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

    const ExampleDocument: Descendant[] = [
        {
            type: "h1",
            children: [{text: "Law"}],
        },
        {
            type: "h2",
            children: [{text: "Article 1"}],
        },
        {
            type: "paragraph",
            children: [
                {text: "i want to finish this as soon as possible!!."},

            ],
        },
        {
            type: "h2",
            children: [{text: "Article 2"}],
        },
        {
            type: "paragraph",
            children: [
                {text: "Hello World! This is my paragraph inside a sample document."},
                {text: "Bold text.", bold: true},
                {text: "Italic text.", italic: true},
                {text: "Bold and underlined text.", bold: true, underline: true},
                {text: "variableFoo", code: true},
            ],
        }
    ]
    //convert the typescript array to json string
    const jsonString = JSON.stringify(ExampleDocument, null, 2);


    const saveTheLaw = async () => {

        const articles = [];
        const jsonObjectsArray = JSON.parse(jsonString) // convert the json string to json object arrY

        for (let i = 0; i < jsonObjectsArray.length; i++) {
            const currentElement = jsonObjectsArray[i];
            const nextElement = jsonObjectsArray[i + 1];

            if (currentElement.type === "h2" && nextElement && nextElement.type === "paragraph") {
                const title = currentElement.children[0]?.text || "";
                const content = nextElement.children.map((child: { text: any; }) => child.text).join(" ");

                articles.push({ name: title, content });
            }
        }


        console.log(articles);


        const initialAnnotations = annotations.map(annotation => ({
            text: annotation.comment,
            definition: annotation.definition,
            comment: annotation.comment,
            json: jsonString
        }));

        const law = {"title": jsonObjectsArray[0].children[0].text};
        console.log(law)


        const formattedAnnotations = initialAnnotations.map(annotation => ({
            text: 'this should be saved in the state as well',
            definition: annotation.definition,
            comment: annotation.comment,
            matterId: '9b07767e-e987-4c48-93f9-8d36daf2ee9b',
            relationSchemaId: '9b07767f-176d-4692-9f4b-bcf6b68eebd6',
        }));

        const formattedArticles = articles.map(article => ({
            articleId: '9b07767f-c39f-4be6-8ba3-2393f02dd71f',
            title: article.name,
            text: article.content,
            jsonText: jsonString,
            annotations: formattedAnnotations,
        }));
        console.log(formattedArticles)


        try {
            await saveLaw({
                variables: {
                    input: {
                        lawId: '9b07767f-3652-46c2-a9a7-1e5fc609e30a',
                        title: law.title,
                        isPublished: false,
                        articles: formattedArticles,
                    },
                },
            });
        } catch (error) {
            console.error('Error saving law:', error);
        }
    };
    useEffect(() => {
        console.log(annotations);
    }, [annotations]);


    const [matter, setMatter] = React.useState<Matter>({title: "Afleidingsregel", color: "#d47478"});
    const [definition, setDefinition] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [document, setDocument] = useState<Descendant[]>(ExampleDocument);

    const [editor] = useState(() => withReact(createEditor()));
    const [selection, setSelection] = useSelection(editor);

    const onChangeHandler = useCallback(
        (document: any) => {
            setDocument(document);
            setSelection(editor.selection);
        },
        [editor.selection, setDocument, setSelection]
    );

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

                <h1 style={Title}>Artikel 80</h1>
            </Grid>
            <Grid container direction={"row"} spacing={5}>
                <Slate editor={editor} initialValue={document} onChange={onChangeHandler}>
                    <Grid item lg={4}>
                        <AnnotationMenu selection={selection} setSelection={setSelection} matter={matter}
                                        setMatter={setMatter} definition={definition} setDefinition={setDefinition}
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
