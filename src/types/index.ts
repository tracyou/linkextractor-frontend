import {ReactEditor} from "slate-react";

export interface Matter {
    title: string,
    color: string,
    id: string,
}
export interface Annotation {
    id?: string,
    matter: Matter,
    definition: string,
    comment: string,
    articleId: string,
    text: string
}

export type ArticleNode = {
    type: 'article';
    id: string;
    children: CustomText[];
};

export type CustomElement = { type: string; children: CustomText[] }
export type CustomText = { text: string, bold?: boolean, italic?: boolean, code?: boolean, underline?: boolean }

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
