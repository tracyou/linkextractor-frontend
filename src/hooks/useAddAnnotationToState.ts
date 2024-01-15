import {
    annotationState,
    annotationIdState, articleState,
} from "../recoil/AnnotationState";
import { useRecoilCallback } from "recoil";
import {SimpleAnnotationFragment, SimpleArticleFragment} from "../graphql/api-schema";
import {findAncestorWithType} from "../utils/EditorAnnotationUtils";
import {Editor} from "slate";

export default function useAddAnnotationToState() {

    return useRecoilCallback(
        ({ set }) => (id: string, annotationData: SimpleAnnotationFragment, editor: Editor) => {
            set(annotationIdState, (ids: Set<string>) => new Set([...Array.from(ids), id]));
            set(annotationState(id), annotationData);

            // Add to respective article
            const ancestorWithType = findAncestorWithType(
                editor,
                editor.selection ? Editor.path(editor, editor.selection.anchor) : null,
                'article'
            );

            if (ancestorWithType) {
                set(articleState(ancestorWithType.id), (article) => {
                    if (article) {
                        // Convert Set to array before updating annotations
                        const updatedArticle: SimpleArticleFragment = {
                            ...article,
                            annotations: [...article.annotations, annotationData],
                        };
                        return updatedArticle;
                    }
                    return article; // Return the original article if it's undefined
                });
            }
        },
        []
    );
}
