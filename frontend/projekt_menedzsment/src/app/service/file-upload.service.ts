import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadFileRequest } from '../model/UploadFileRequest';
import { Observable } from 'rxjs';
import { UploadFile } from '../model/UploadFile';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080/file';
  constructor(private http: HttpClient) {}

  uploadFile(
    formData: FormData,
    projektId: number
  ): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.baseUrl}/${projektId}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  download(filename: string)  {
    return this.http.get(`${this.baseUrl}/download/${filename}`, {
      responseType: 'blob' as 'json',
    });
  }

  getFiles(){
    return this.http.get<UploadFile[]>(`${this.baseUrl}`);
  }
}
