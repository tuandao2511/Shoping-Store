import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';
import { User } from '../models/User';
import { UserResponse } from '../response/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<UserResponse>;
  public currentUserObservable: Observable<UserResponse>;

  constructor(private http: HttpClient,  private cookieService: CookieService) { 
    const user = localStorage.getItem('currentUser');
    cookieService.set('currentUser', user);
    this.currentUserSubject = new BehaviorSubject<UserResponse>(JSON.parse(user));
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  signUp(user: User) : Observable<User>{
    const url = `${apiUrl}/register`;
    return this.http.post<User>(url, user);
  }

  login(userForm) : Observable<UserResponse>{
    const url = `${apiUrl}/login`;
    return this.http.post<UserResponse>(url, userForm).pipe(
      tap(user => {
        if(user && user.token) {
          this.cookieService.set('currentUser', JSON.stringify(user));
          if(userForm.remembered) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        }
        this.currentUserSubject.next(user);
        console.log((user.name));
      }),
      catchError(this.handleError('Login Failed', null))
    );
  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

          console.log(error); // log to console instead

          // Let the app keep running by returning an empty result.
          return of(result as T);
      };
  }
  
}
