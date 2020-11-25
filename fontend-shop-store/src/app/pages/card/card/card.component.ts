import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  title: string;
  page: any;
  private paramSub: Subscription;
  private querySub: Subscription;

  constructor(private productService: ProductService, private router: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.querySub = this.router.queryParams.subscribe(() => {
        this.update();
    })

    this.paramSub = this.router.params.subscribe(() => {
      this.update();
    })
  }

  getProducts(page: number = 1, size: number = 3) {
    if(this.router.snapshot.url[0].path === 'product') {
      this.productService.getAllInPage(page, size).subscribe(res => {
        this.page = res;
        this.title = "Get Whatever You Want!"
        console.log('page ' + JSON.stringify(this.page));
      }) 
    } else if(this.router.snapshot.url[0].path == 'category'){
        const type = this.router.snapshot.url[1].path;
        this.productService.getCategoryInPage(type, page, size).subscribe( categoryPage => {
            this.title = categoryPage.category;
            this.page = categoryPage.page;
        });
    }
  }

  update() {
    if(this.router.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.router.snapshot.queryParamMap.get('page');
      const size = +this.router.snapshot.queryParamMap.get('size');
      this.getProducts(currentPage, size);
    } else {
      this.getProducts();
    }
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }
  
}

