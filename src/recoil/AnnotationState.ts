import {atom, atomFamily, selector} from "recoil";
import {Node} from 'slate'
import {SimpleAnnotationFragment, ArticleFragment} from "../graphql/api-schema";

export const annotationState = atomFamily<SimpleAnnotationFragment | undefined, string>({
    key: "annotations"
});

export const annotationIdState = atom<Set<string>>({
    key: "annotationIds",
    default: new Set([]),
});

export const articleState = atomFamily<ArticleFragment | undefined, string>({
    key: "articles",
});

export const allArticlesState = selector({
    key: 'allArticlesState',
    get: ({ get }) => {
        const articleIds = Array.from(get(articleIdState));
        return articleIds.map(articleId => get(articleState(articleId)));
    },
});

export const articleIdState = atom<Set<string>>({
    key: "articleIds",
    default: new Set([]),
});

export const activeAnnotationIdsState = atom<Set<string>>({
    key: "activeAnnotationIds",
    default: new Set([]),
})

export const activeTextNode = atom<Node | null>({
    key: "activeNode",
    default: null
})

export const editableAnnotation = atom<SimpleAnnotationFragment | undefined>({
    key: "editableAnnotation",
    default: undefined
})



