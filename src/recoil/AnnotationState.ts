import {atom, atomFamily} from "recoil";
import {Annotation} from "../types";

export const annotationState = atomFamily<Annotation, string>({
    key: "annotations"
});

export const annotationIdState = atom<Set<string>>({
    key: "AnnotationIds",
    default: new Set([]),
});
