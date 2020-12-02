import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  signUp(user: User) : Observable<User>{
    const url = `${apiUrl}/register`;
    return this.http.post<User>(url, user);
  }
  
}
