import {RecoilState, useRecoilCallback} from 'recoil';
import { annotationState, articleState } from '../recoil/AnnotationState';
import { Editor } from 'slate';
import { findAncestorWithType } from '../utils/EditorAnnotationUtils';
import {SimpleAnnotationFragment, SimpleArticleFragment} from "../graphql/api-schema";

export default function useUpdateAnnotation() {
    return useRecoilCallback(
        ({ set }) => (annotationId: string, updatedAnnotationData: SimpleAnnotationFragment, editor: Editor) => {
            // Update the annotation
            set(annotationState(annotationId), updatedAnnotationData);

            console.log(editor.selection)
            // Update the respective article
            const ancestorWithType = findAncestorWithType(
                editor,
                editor.selection ? Editor.path(editor, editor.selection.anchor) : null,
                'article'
            );

            console.log(ancestorWithType)

            if (ancestorWithType) {
                set(
                    (articleState(ancestorWithType.id) as unknown) as RecoilState<SimpleArticleFragment>,
                    (article) => {
                        if (article) {
                            // Find and update the annotation in the article
                            const updatedAnnotations = article.annotations.map((annotation) =>
                                annotation.id === annotationId ? updatedAnnotationData : annotation
                            );

                            // Create a new article object with the updated annotations
                            const updatedArticle: SimpleArticleFragment = {
                                ...article,
                                annotations: updatedAnnotations,
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
