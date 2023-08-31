import { Projekt } from "./Projekt"

export interface User{
    id?: number
    username: string
    password?: string
    email?: string
    img?: string,
    projects?: Projekt[],
    firstName?: string,
    lastName?: string,
    post?: string,
    ipAddress?: string,
    userAgent?: string
}