import {atom, atomFamily, selectorFamily} from "recoil";
import {Node} from 'slate'
import {Annotation} from "../types";
import {SimpleAnnotationFragment} from "../graphql/api-schema";

export const annotationState = atomFamily<SimpleAnnotationFragment | undefined, string>({
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

export const activeTextNode = atom<Node | null>({
    key: "activeNode",
    default: null
})

export const editableAnnotation = atom<SimpleAnnotationFragment | undefined>({
    key: "editableAnnotation",
    default: undefined
})



