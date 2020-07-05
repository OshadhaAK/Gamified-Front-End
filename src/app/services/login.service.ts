import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:8080/api/users/";
  
  constructor(private http: HttpClient) { }

  login(body: any){
    return this.http.post(this.url + 'login', body, {
      observe: 'body'
    });
  }
}
