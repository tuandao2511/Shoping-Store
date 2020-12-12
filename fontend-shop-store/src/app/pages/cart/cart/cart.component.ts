import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounce, debounceTime, switchMap } from 'rxjs/operators';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { UserResponse } from 'src/app/response/UserResponse';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationUtils } from 'src/app/utils/ValidationUtils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy, AfterContentChecked {

  productsInOrder : ProductInOrder[]=  [];
  title = ""
  price = 0;
  private subQuantity: Subject<ProductInOrder> = new Subject();
  private sub: Subscription;
  currentUser: UserResponse;
  constructor(private cartService: CartService, private router: Router, private userService: UserService) { 
    
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if(!this.currentUser) {
      this.cartService.storeLocalCart();
    }
  }

  ngAfterContentChecked(): void {
    this.calculateTotalPrice();
  }

  ngOnInit(): void {
    this.getProductsInOrder();
    this.title = "My Cart"
    this.currentUser = this.userService.currentUserValue;

    this.sub = this.subQuantity.pipe(
        debounceTime(300),
        switchMap(productInOrder => {
          console.log('productInOrder ' + JSON.stringify(productInOrder));
          
          return this.cartService.update(productInOrder);
        })
    ).subscribe( pOD => {
      console.log('pOD ' + pOD);
      if (!pOD) { 
        throw new Error(); 
      }

    }, _ => console.log('Update Item Failed'));
  }

  getProductsInOrder() {
    this.cartService.getCart().subscribe(res => {
      this.productsInOrder = res;
    })
  }

  onChange(productInOrder: ProductInOrder) {
    ValidationUtils.validateCount(productInOrder);
    console.log('onChange ' + JSON.stringify(productInOrder));
    this.subQuantity.next(productInOrder);
  }

  calculateTotalPrice() {
    let localPrice = 0;
    this.productsInOrder.forEach((prodInOrder, index) => {
      localPrice += prodInOrder.productPrice * prodInOrder.count;
    })
    this.price = localPrice;
  }

  checkout() {
    if(!this.currentUser) {
      this.router.navigateByUrl('/login')
    } else {
      this.cartService.checkout().subscribe(_ => {
        this.productsInOrder = [];
      }, error => {
        console.log('Checkout Cart Failed');
      });
      this.router.navigateByUrl('/');
    }
  }

  remove(productInOrder: ProductInOrder) {
    this.cartService.remove(productInOrder)
    .subscribe(res =>{
      this.productsInOrder = this.productsInOrder.filter(e => e.productId !== productInOrder.productId);
    }, error =>{
      console.log('remove failed')
    })
  }

}
