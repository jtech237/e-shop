interface TimeStamp {
    createdAt: Date
    updatedAt: Date
}
export interface Image extends TimeStamp{
    id: number
    url: string
    alt?: string
}

export interface Category extends TimeStamp{
    id: number
    name: string
    description?: string
    imageId?: number | null
    image?: Image | null
    parentId?: number | null
    parent?:  Category | null
    depth: number
}