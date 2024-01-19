import {
    annotationState,
    annotationIdState, articleState,
} from "../recoil/AnnotationState";
import { useRecoilCallback } from "recoil";
import {SimpleAnnotationFragment, ArticleFragment} from "../graphql/api-schema";
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
                        let articleRevision = article.revision;
                        if (!articleRevision) {
                            articleRevision = {
                                id: '',
                                jsonText: '',
                                updatedAt: '',
                                createdAt: '',
                                annotations: [],
                            };
                        }

                        // Convert Set to array before updating annotations
                        const updatedArticle: ArticleFragment = {
                            ...article,
                            revision: {
                                ...articleRevision,
                                annotations: [...articleRevision.annotations, annotationData],
                            },
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
