import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../model/Image';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {
  private baseUrl="http://localhost:8080/users";

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ){}

    uploadImage(formData: FormData){
      return this.http.post<Image>(`${this.baseUrl}/image`, formData);
    }

    getImageUrl(imgName?: string): Observable<string | null> {
      const login = localStorage.getItem('login');
      if (login) {
        const imageName = imgName ? imgName : JSON.parse(login).img;
        return this.authService.loadImage(imageName).pipe(
          map((response) => {
            if (!response.hasOwnProperty('error')) {
              return URL.createObjectURL(response as Blob);
            } else {
              return null;
            }
          }),
          catchError((error) => {
            console.error('Hiba a kép betöltésekor:', error);
            return of(null);
          })
        );
      } else {
        return of(null);
      }
    }
}
