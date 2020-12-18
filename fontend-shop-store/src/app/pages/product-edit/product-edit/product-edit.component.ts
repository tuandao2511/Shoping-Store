import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product = new ProductInfo();


  constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private router: Router) {
  }
  productId: string;
  isEdit = false;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEdit = true;
      this.productService.getDetail(this.productId).subscribe(prod => this.product = prod);
    }
  }

  update() {
    this.productService.update(this.product).subscribe(prod => {
            if (!prod) throw new Error();
            this.router.navigate(['/seller']);
        },
        err => {
        });
  }

  onSubmit() {
    if (this.productId) {
        this.update();
    } else {
        this.add();
    }
  }

  add() {
    this.productService.create(this.product).subscribe(prod => {
            if (!prod) throw new Error;
            this.router.navigate(['/']);
        },
        e => {
      });
    }
}
