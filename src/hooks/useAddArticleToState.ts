import {
    articleIdState, articleState,
} from "../recoil/AnnotationState";
import {useRecoilCallback} from "recoil";
import {ArticleFragment} from "../graphql/api-schema";

export default function useAddArticleToState() {
    return useRecoilCallback(
        ({set}) => (id: string, articleData: ArticleFragment) => {
            set(articleIdState, (ids: Set<string>) => new Set([...Array.from(ids), id]));
            set(articleState(id), articleData);
        },
        []
    );
}
