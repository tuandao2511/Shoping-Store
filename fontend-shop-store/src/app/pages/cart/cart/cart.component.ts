import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
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

  constructor(private cartService: CartService, private router: Router) { 
    
  }
  ngOnDestroy(): void {
  }
  ngAfterContentChecked(): void {
    this.calculateTotalPrice();
  }

  ngOnInit(): void {
    this.getProductsInOrder();
    this.title = "My Cart"
  }

  getProductsInOrder() {
    this.cartService.getCart().subscribe(res => {
      this.productsInOrder = res;
    })
  }

  onChange(productInOrder: ProductInOrder) {
    ValidationUtils.validateCount(productInOrder);
  }

  calculateTotalPrice() {
    let localPrice = 0;
    this.productsInOrder.forEach((prodInOrder, index) => {
      localPrice += prodInOrder.productPrice * prodInOrder.count;
    })
    this.price = localPrice;
  }

  checkout() {
    console.log('checkout');
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
