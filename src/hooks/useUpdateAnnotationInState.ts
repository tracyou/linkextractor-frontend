import {RecoilState, useRecoilCallback} from 'recoil';
import { annotationState, articleState } from '../recoil/AnnotationState';
import { Editor } from 'slate';
import { findAncestorWithType } from '../utils/EditorAnnotationUtils';
import {SimpleAnnotationFragment, ArticleFragment} from "../graphql/api-schema";

export default function useUpdateAnnotation() {
    return useRecoilCallback(
        ({ set }) => (annotationId: string, updatedAnnotationData: SimpleAnnotationFragment, editor: Editor) => {
            // Update the annotation
            set(annotationState(annotationId), updatedAnnotationData);

            // Update the respective article
            const ancestorWithType = findAncestorWithType(
                editor,
                editor.selection ? Editor.path(editor, editor.selection.anchor) : null,
                'article'
            );

            if (ancestorWithType) {
                set(
                    (articleState(ancestorWithType.id) as unknown) as RecoilState<ArticleFragment>,
                    (article) => {
                        if (article) {
                            // Find and update the annotation in the article
                            const updatedAnnotations = article.revision?.annotations.map((annotation) =>
                                annotation.id === annotationId ? updatedAnnotationData : annotation
                            );

                            // Create a new article object with the updated annotations
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

                            const updatedArticle: ArticleFragment = {
                                ...article,

                                revision: {
                                    ...articleRevision,
                                    annotations: updatedAnnotations || [],
                                },
                            };

                            return updatedArticle;
                        }
                        return article; // Return the original article if it's undefined
                    }
                );
            }
        },
        []
    );
}
