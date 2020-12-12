import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) { 

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.userService.currentUserValue;
    if(currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${currentUser.type} ${currentUser.token}`,
          'Content-Type': 'application/json'
        }
      })
    }
    return next.handle(req);
  }
}
