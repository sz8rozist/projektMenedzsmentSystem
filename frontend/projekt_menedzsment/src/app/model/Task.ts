export interface Task{
    id?: number | string,
    name: string,
    description: string,
    deadline?: Date,
    board_id: number
}