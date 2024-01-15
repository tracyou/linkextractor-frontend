import { DefaultElement } from "slate-react";
import React from "react";
import {getAnnotationsOnTextNode} from "../utils/EditorAnnotationUtils";
import AnnotatedText from "../components/Editor/AnnotatedText/AnnotatedText";
import {Editor} from "slate";

export default function useEditorConfig(editor: Editor) {
    const { isVoid } = editor;
    editor.isVoid = (element) => {
        return ["image"].includes(element.type) || isVoid(element);
    };

    editor.isInline = (element) => ["link"].includes(element.type);

    return { renderElement, renderLeaf};
}

const renderElement = (props : any) => {
    const { element, children, attributes } = props;
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
}

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
                textNode={leaf}
            >
                {el}
            </AnnotatedText>
        );
    }

    return <span {...attributes}>{el}</span>;
}
