import {
    annotationState,
    annotationIdState, articleState,
} from "../recoil/AnnotationState";
import {useRecoilCallback} from "recoil";
import {Editor} from "slate";
import {findAncestorWithType} from "../utils/EditorAnnotationUtils";
import {ArticleFragment} from "../graphql/api-schema";

export default function useRemoveAnnotationFromState() {
    return useRecoilCallback(({set, snapshot}) => async (idToRemove: string, editor: Editor) => {
        const currentIds = await snapshot.getPromise(annotationIdState);
        const updatedIds = new Set([...currentIds].filter((id) => id !== idToRemove));
        set(annotationIdState, updatedIds);
        set(annotationState(idToRemove), undefined);

        //Remove from respective article
        const ancestorWithType = findAncestorWithType(
            editor,
            editor.selection ? Editor.path(editor, editor.selection.anchor) : null, 'article');

        if (ancestorWithType) {
            set(articleState(ancestorWithType.id), (article) => {
                // Create a new article object with the updated annotations
                const updatedArticle: ArticleFragment = {
                    ...article!,
                    revision: article!.revision && {
                        ...article!.revision,
                        annotations: article!.revision?.annotations.filter((annotation) => annotation.id != idToRemove)
                    },
                };
                return updatedArticle;
            });
        }
    }, []);
}
