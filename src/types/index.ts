import {ReactEditor} from "slate-react";

export type CustomElement = { type: string; children: CustomText[] }
export type CustomText = { text: string, bold?: boolean, italic?: boolean, code?: boolean, underline?: boolean }

export type ArticleNode = {
    type: 'article';
    id: string;
    children: CustomText[];
};

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
