import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './pages/card/card/card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationComponent } from './parts/navigation/navigation/navigation.component';
import { FooterComponent } from './pages/footer/footer/footer.component';
import { DetailComponent } from './pages/product-detail/detail/detail.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './pages/product-list/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { CookieService } from 'ngx-cookie-service';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { SignUpComponent } from './pages/sign-up/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login/login.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

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
    SignUpComponent,
    LoginComponent,
    OrderComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CookieService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
