import {v4 as uuidv4} from 'uuid';
import {Editor} from "slate";
import {Annotation} from "../types";

const ANNOTATION_PREFIX = "annotation_";

export function getMarkForAnnotationID(annotationID: string) {
    return `${ANNOTATION_PREFIX}${annotationID}`;
}

export function getAnnotationsOnTextNode(textNode: any): Set<string> {
    if (textNode == null) {
        debugger;
    }
    return new Set(
        Object.keys(textNode)
            .filter(isAnnotationIDMark)
            .map(getAnnotationIdFromMark)
    );
}

export function getAnnotationIdFromMark(mark: any) {
    if (!isAnnotationIDMark(mark)) {
        throw new Error("Expected mark to be of an annotation");
    }
    return mark.replace(ANNOTATION_PREFIX, "");
}

function isAnnotationIDMark(possibleAnnotation: any) {
    return possibleAnnotation.indexOf(ANNOTATION_PREFIX) === 0;
}

export function insertAnnotation(editor: Editor, addAnnotationToState: any, annotation: Annotation) {
    annotation.id = uuidv4();
    addAnnotationToState(annotation.id, annotation);
    Editor.addMark(editor, getMarkForAnnotationID(annotation.id), true);
    return annotation.id;
}
