export interface Tag {
    id: number,
    active: boolean,
    name: string,
    timesUsed: number
}

export interface Book {
    id: number,
    name: string,
    tags: number[],
    src: string,
    favorite: boolean,
    date: string,
    isRequireLogin: boolean,
    link: string,
    description: string
}

export interface Credentials {
    email: string,
    name: string,
    isDataProvided: boolean
}

export interface User {
    name: string | null
    email: string | null
}