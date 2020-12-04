import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';
import { User } from '../models/User';
import { UserResponse } from '../response/UserResponse';

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

  login(userForm) : Observable<UserResponse>{
    const url = `${apiUrl}/login`;
    return this.http.post<UserResponse>(url, userForm).pipe(
      tap(user => {
        
      })
    );
  }
  
}
