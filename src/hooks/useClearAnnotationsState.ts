import {
    annotationState,
    annotationIdState,
} from "../recoil/AnnotationState";
import { useRecoilCallback } from "recoil";

export default function useClearAnnotationState() {
    return useRecoilCallback(({ set, snapshot }) => async () => {
        // Clear the entire annotationIdState
        set(annotationIdState, new Set());

        // Clear all individual annotationState atoms
        const currentIds = await snapshot.getPromise(annotationIdState);
        currentIds.forEach((id) => {
            set(annotationState(id), undefined);
        });
    }, []);
}
