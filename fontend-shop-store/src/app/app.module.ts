import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './pages/card/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './parts/navigation/navigation/navigation.component';
import { FooterComponent } from './pages/footer/footer/footer.component';
import { DetailComponent } from './pages/product-detail/detail/detail.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './pages/product-list/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { CookieService } from 'ngx-cookie-service';
import { PaginationComponent } from './parts/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    NavigationComponent,
    FooterComponent,
    DetailComponent,
    ProductListComponent,
    CartComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
