import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { ProductInOrder } from '../models/ProductInOrder';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { UserResponse } from '../response/UserResponse';
import { apiUrl } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Cart } from '../models/Cart';

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
    const localCart : ProductInOrder[]= this.getLocalCart();
    if(this.currentUser) {
      if(localCart.length > 0) {
        return this.http.post<Cart>(this.cartUrl, localCart).pipe(
          tap(_ => {
            this.clearLocalCart();
          }),
          map(data => data?.products),
          catchError(_ => of([]))
        );
      } else {
        return this.http.get<Cart>(this.cartUrl).pipe(
          map(data => data?.products)
        )
      }
    } else {
      return of(localCart);
    }
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

  clearLocalCart() {
    this.localMap = {};
    this.cookieStore.delete('cart');
  }

  checkout() : Observable<any>{
    const url = `${this.cartUrl}/checkout`
    return this.http.post(url, null).pipe();
  }

  update(productInOrder: ProductInOrder): Observable<ProductInOrder> {
    if(this.currentUser) {
      const url = `${this.cartUrl}/${productInOrder.productId}`
      return this.http.put<ProductInOrder>(url, productInOrder.count).pipe()
    } else {
      this.localMap[productInOrder.productId] = productInOrder;
    }
  }

  storeLocalCart() {
    this.cookieStore.set('cart', JSON.stringify(this.localMap));
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
