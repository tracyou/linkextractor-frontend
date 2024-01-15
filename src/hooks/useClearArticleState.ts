import {
    articleIdState, articleState,
} from "../recoil/AnnotationState";
import {useRecoilCallback} from "recoil";

export default function useClearArticleState() {
    return useRecoilCallback(({set, snapshot}) => async () => {
        // Clear the entire annotationIdState
        set(articleIdState, new Set());

        // Clear all individual annotationState atoms
        const currentIds = await snapshot.getPromise(articleIdState);
        currentIds.forEach((id) => {
            set(articleState(id), undefined);
        });
    }, []);
}
