import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { ProductInOrder } from '../models/ProductInOrder';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { UserResponse } from '../response/UserResponse';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  localMap = {};
  currentUser: UserResponse
  private cartUrl = `${apiUrl}/cart`;

  constructor(private cookieStore: CookieService, private http: HttpClient, private userService: UserService) { 
    userService.currentUserObservable.subscribe(user => {
      this.currentUser = user;
    })

  }

  addItem(productInOrder: ProductInOrder): Observable<boolean> {
    if(!this.currentUser) {
      if(this.cookieStore.check('cart')) {
        this.localMap = JSON.parse(this.cookieStore.get('cart'));
      }

      if(!this.localMap[productInOrder.productId]) {
        this.localMap[productInOrder.productId] = productInOrder;
      } else{
        this.localMap[productInOrder.productId].count += productInOrder.count;
      }

      this.cookieStore.set('cart', JSON.stringify(this.localMap));
      return of(true);
    } else {
      console.log('addItem')
      const url = `${this.cartUrl}/add`;
            return this.http.post<boolean>(url, {
                'quantity': productInOrder.count,
                'productId': productInOrder.productId
      });
    }
  }

  getCart() : Observable<ProductInOrder[]> {
    const localCart = this.getLocalCart();
    return of(localCart);
  }

  remove(productInOrder: ProductInOrder) : Observable<boolean>{
    if(!this.currentUser) {
      if(this.cookieStore.check('cart')) {
        this.localMap = JSON.parse(this.cookieStore.get('cart'));
      }
  
      if(!this.localMap[productInOrder.productId]) {
          return of(false);
      } else {
        delete this.localMap[productInOrder.productId]
      }
      this.cookieStore.set('cart', JSON.stringify(this.localMap));
      return of(true);
    } else {
        const url = `${this.cartUrl}/${productInOrder.productId}`;
        return this.http.delete<boolean>(url).pipe();
    }
  }

  private getLocalCart(): ProductInOrder[] {
    if(this.cookieStore.check('cart')) {
      this.localMap = JSON.parse(this.cookieStore.get('cart'));
      return Object.values(this.localMap);
    } else {
      this.localMap = {};
      return [];
    }
  }

}
