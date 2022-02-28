import { User } from './../classes/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseurl = "http://localhost:8080/api/frontusers/login";
  constructor(private httpclient: HttpClient) { }
  
  loginuser(user: User): Observable<User>{
    
    // console.log(user);
    return this.httpclient.post<User>(`${this.baseurl}`,user);
    
   

  }
}
