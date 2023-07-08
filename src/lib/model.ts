export interface Board{
    title: string,
    description: string,
    lanes: Lane[]
}
export interface Lane{
    title: string,
    items: Item[]
}
export interface Item{
    title: string,
    description: string,
    prio: number
}