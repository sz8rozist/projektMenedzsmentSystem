import { Column } from './Column';

export interface Board{
    id?: number,
    name: string,
    boardColumns: Column[]
}

export interface NewBoard{
    name: string,
}