import {
    annotationState,
    annotationIdState,
} from "../../recoil/AnnotationState";

import { useRecoilCallback } from "recoil";
import {Annotation} from "../../types";

export default function useAddAnnotationToState() {
    return useRecoilCallback(
        ({ set }) => (id: string, annotationData: Annotation) => {
            set(annotationIdState, (ids : Set<string>) => new Set([...Array.from(ids), id]));
            set(annotationState(id), annotationData);
        },
        []
    );
}
