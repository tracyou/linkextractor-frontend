import React, {useCallback, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Title} from "../../stylesheets/Fonts";
import {createEditor, Descendant} from "slate";
import {Matter} from "../../types";
import AnnotationMenu from "../Editor/Menu/AnnotationMenu";
import useSelection from "../../hooks/useSelection";
import {DefaultElement, Editable, ReactEditor, Slate, withReact} from "slate-react";
import {useRecoilSnapshot} from "recoil";
import {getAnnotationsOnTextNode} from "../../utils/EditorAnnotationUtils";
import AnnotatedText from "../Editor/AnnotatedText/AnnotatedText";
import {MattersDocument, MattersQuery} from "../../graphql/api-schema";
import {useQuery} from "@apollo/client";

const EditArticle = () => {
    const {data} = useQuery<MattersQuery>(MattersDocument)

    const MATTER_COLORS = data?.matters.reduce((acc: any, matter) => {
        acc[matter.name] = matter.color;
        return acc;
    }, {});

    //TODO
    //If field 'json' of articles equals null then loop through all available articles and map them to article form below
    //On save first save annotations, which returns list of new ids
    //Write function that
    const ExampleDocument: any[] = [
        {
            type: "h1",
            children: [{text: "Law"}],
        },
        {
            type: "article",
            id: "1",
            children: [
                {
                    type: "h2",
                    children: [{text: "First article"}],
                },
                {
                    type: "paragraph",
                    children: [
                        {text: "Hello World! This is my paragraph inside a sample document."},
                        {text: "Bold text.", bold: true, annotation_id: true},
                        {text: "Italic text.", italic: true},
                        {text: "Bold and underlined text.", bold: true, underline: true},
                        {text: "variableFoo", code: true},
                    ],
                },
            ]
        },
        {
            type: "article",
            id: "2",
            children: [
                {
                    type: "h2",
                    children: [{text: "Second article"}],
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
        }
    ]

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
