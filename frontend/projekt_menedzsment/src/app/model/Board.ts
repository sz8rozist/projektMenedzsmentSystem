import { Task } from './Task';

export interface Board{
    id?: number,
    name: string,
    tasks: Task[]
}

export interface NewBoard{
    name: string,
}