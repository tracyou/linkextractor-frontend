import {
    annotationState,
    annotationIdState,
} from "../recoil/AnnotationState";
import { useRecoilCallback } from "recoil";
import {SimpleAnnotationFragment} from "../graphql/api-schema";

export default function useAddAnnotationToState() {
    return useRecoilCallback(
        ({ set }) => (id: string, annotationData: SimpleAnnotationFragment) => {
            set(annotationIdState, (ids : Set<string>) => new Set([...Array.from(ids), id]));
            set(annotationState(id), annotationData);
        },
        []
    );
}
