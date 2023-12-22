import {
    annotationState,
    annotationIdState,
} from "../recoil/AnnotationState";
import {useRecoilCallback} from "recoil";

export default function useRemoveAnnotationFromState() {
    return useRecoilCallback(({set, snapshot}) => async (idToRemove: string) => {
        const currentIds = await snapshot.getPromise(annotationIdState);
        const updatedIds = new Set([...currentIds].filter((id) => id !== idToRemove));
        set(annotationIdState, updatedIds);
        set(annotationState(idToRemove), undefined);
    }, []);
}
