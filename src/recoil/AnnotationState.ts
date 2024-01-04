import {atom, atomFamily} from "recoil";
import { Node } from 'slate'
import {Annotation} from "../types";

export const annotationState = atomFamily<Annotation | undefined, string>({
    key: "annotations"
});

export const annotationIdState = atom<Set<string>>({
    key: "AnnotationIds",
    default: new Set([]),
});

export const activeAnnotationIdsState = atom<Set<string>>({
    key: "activeAnnotationIds",
    default: new Set([]),
})

export const activeTextNode = atom<Node|null>({
    key: "activeNode",
    default: null
})

export const editableAnnotation = atom<Annotation|undefined>({
    key: "editableAnnotation",
    default: undefined
})
