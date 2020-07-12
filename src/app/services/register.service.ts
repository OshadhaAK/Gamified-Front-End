import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string = "http://localhost:8080/api/users/";

  constructor(private http: HttpClient) { }

  register(body: any) {
    console.log('hit')
    return this.http.post(this.url + 'register', body,{
      observe: 'body'
    });
  }

  upload(formData) {
    return this.http.post<any>(this.url + 'file', formData);
  }
}
