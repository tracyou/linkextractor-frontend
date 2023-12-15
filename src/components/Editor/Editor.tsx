import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react'
import {createEditor} from 'slate'
import {Slate, Editable, withReact, DefaultElement} from 'slate-react'
import {BaseEditor, Descendant} from 'slate'
import {ReactEditor} from 'slate-react'
import useSelection from "../../utils/hooks/useSelection";
import Toolbar from "./Toolbar";
import {getAnnotationsOnTextNode} from "../../utils/EditorAnnotationUtils"
import AnnotatedText from "./AnnotatedText";
import {useRecoilSnapshot} from "recoil";
import {Matter} from "../../types";

type CustomElement = { type: string; children: CustomText[] }
type CustomText = { text: string, bold?: boolean, italic?: boolean, code?: boolean, underline?: boolean }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

interface EditorProps {
    document: Descendant[]
    onChange: Dispatch<SetStateAction<Descendant[]>>
    matter: Matter
    description: string
    comment: string
}

const editor: React.FC<EditorProps> = ({document, onChange, matter, description, comment}) => {
    const [editor] = useState(() => withReact(createEditor()));

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

    function renderLeaf(props: any) {
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

        //This is also not the right place since if you add a second annotation to the same textnode the amount of hooks called will differ
        // let annotation = undefined;
        const annotationIds = getAnnotationsOnTextNode(leaf);
        // const mostRecentId = Array.from(annotationIds);
        // if (mostRecentId.length != 0) {
        //     console.debug("hook fired")
        //     annotation = useRecoilValue(annotationState(mostRecentId[0]));
        // }

        if (annotationIds.size > 0) {
            return (
                <AnnotatedText
                    {...attributes}
                    annotations={annotationIds}
                    // mostRecent={annotation}
                    textNode={leaf}
                >
                    {children}
                </AnnotatedText>
            );
        }

        return <span {...attributes}>{el}</span>;
    }

    const [selection, setSelection] = useSelection(editor);
    const onChangeHandler = useCallback(
        (document: any) => {
            onChange(document);
            setSelection(editor.selection);
        },
        [editor.selection, onChange, setSelection]
    );

    return (
        <Slate editor={editor} initialValue={document} onChange={onChangeHandler}>
            <Toolbar selection={selection} matter={matter} description={description} comment={comment}/>
            <Editable renderElement={renderElement} renderLeaf={renderLeaf}/>]
            <DebugObserver/>
        </Slate>
    )
}

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

export default editor;
