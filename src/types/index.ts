export interface Matter {
    title: string,
    color: string
}
export interface Annotation {
    id?: string,
    matter: Matter,
    definition: string,
    comment: string
}
