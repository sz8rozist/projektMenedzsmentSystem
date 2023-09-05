import { Projekt } from "./Projekt";

export interface UploadFile{
    id?: number;
    fileName: string;
    origName: string;
    uploadedDate?: string;
    projekt?: Projekt
}