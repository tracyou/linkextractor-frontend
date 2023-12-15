
export interface Matter {
    title: string,
    color: string
}
export interface Annotation {
    id?: string,
    matter: Matter,
    description: string,
    comment: string
}
