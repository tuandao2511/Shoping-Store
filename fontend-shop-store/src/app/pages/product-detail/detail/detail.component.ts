import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  productInfo: ProductInfo;
  count: number;
  title: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.getProduct();
    this.title = 'Product Detail';
    this.count = 1;
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getDetail(id).subscribe(
        prod => {
          this.productInfo = prod;
        },
        _ => console.log('Get Cart Failed')
    );
  }

  validateCount() {
    console.log('Validate');
    const max = this.productInfo.productStock;
    if (this.count > max) {
      this.count = max;
    } else if (this.count < 1) {
      this.count = 1;
    }
  }

  addToCart() {
    this.cartService.addItem(new ProductInOrder(this.productInfo, this.count))
    .subscribe(res => {
      if(!res) {
        console.log('Add Cart failed' + res);
        throw new Error();
      }
      this.router.navigateByUrl('/cart');
    }, 
    _ => {
      console.log('Add Cart Failed')
    })
  }

}
