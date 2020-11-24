import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { ProductInOrder } from '../models/ProductInOrder';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  localMap = {};

  constructor(private cookieStore: CookieService) { 

  }

  addItem(productInOrder: ProductInOrder): Observable<boolean> {
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
  }

  getCart() : Observable<ProductInOrder[]> {
    const localCart = this.getLocalCart();
    return of(localCart);
  }

  remove(productInOrder: ProductInOrder) : Observable<boolean>{
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
