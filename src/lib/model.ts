export interface Board{
    id: string,
    title: string,
    description: string,
    lanes: Lane[]
}
export interface Lane{
    id: string,
    title: string,
    items: Item[]
}
export interface Item{
    id: string,
    title: string,
    description: string,
    prio: number,
    color: string
}