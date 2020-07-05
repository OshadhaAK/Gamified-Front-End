import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  getUserName(){
    return this.http.get(this.url + 'username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
}
