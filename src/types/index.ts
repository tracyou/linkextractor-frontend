import {ReactEditor} from "slate-react";

export interface Matter {
    title: string,
    color: string
}
export interface Annotation {
    id?: string,
    matter: Matter,
    articleId: string,
    definition: string,
    comment: string
}

export type ArticleNode = {
    type: 'article';
    id: string;
    children: CustomText[];
};

export type CustomElement = ArticleNode | {
    type: string;
    children: CustomText[]
}

export type CustomText = {
    text: string,
    bold?: boolean,
    italic?: boolean,
    code?: boolean,
    underline?: boolean
}

declare module 'slate' {
    export interface CustomTypes {
        Editor: ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
