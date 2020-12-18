import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryType } from 'src/app/enum/CategoryType';
import { ProductStatus } from 'src/app/enum/ProductStatus';
import { Role } from 'src/app/enum/Role';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { UserResponse } from 'src/app/response/UserResponse';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute) {

  }
  Role = Role;
  currentUser: UserResponse;
  page: any;
  CategoryType = CategoryType;
  ProductStatus = ProductStatus;
  private querySub: Subscription;
  
  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
    this.currentUser = this.userService.currentUserValue;
  }

  update() {
    if (this.route.snapshot.queryParamMap.get('page')) {
        const currentPage = +this.route.snapshot.queryParamMap.get('page');
        const size = +this.route.snapshot.queryParamMap.get('size');
        this.getProds(currentPage, size);
    } else {
        this.getProds();
    }
  }

  getProds(page: number = 1, size: number = 5) {
    this.productService.getAllInPage(+page, +size)
        .subscribe(page => {
            this.page = page;
    });
  }

  remove(productInfos: ProductInfo[], productInfo) {
    this.productService.delelte(productInfo).subscribe(_ => {
            productInfos = productInfos.filter(e => e.productId != productInfo);
        },
        err => {
        });
  }

}
