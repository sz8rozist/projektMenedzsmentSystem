import { User } from "./User";

export interface MessageRequest{
    content: string,
    sender: User,
    receiver: User,
    readed: boolean
}