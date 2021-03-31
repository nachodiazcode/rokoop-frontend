import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Photo } from './../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  URI = 'https://weilaystudio.com:4000/api';

  constructor(private http: HttpClient) { }

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();

    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);

    return this.http.post(`${this.URI}/photos`, fd);

  }

  getPhotos() {
    return this.http.get<Photo[]>(`${this.URI}/photos`);
  }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.URI}/photo/${id}`);
  }


  deletePhoto(id: string) {
    return this.http.delete(`${this.URI}/photo/${id}`);
  }

  updatePhoto(id: string, title: string, description: string) {
    return this.http.put(`${this.URI}/photo/${id}`, {id, title, description});
  }

}
