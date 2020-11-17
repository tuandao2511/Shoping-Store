import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './pages/card/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './parts/navigation/navigation/navigation.component';
import { FooterComponent } from './pages/footer/footer/footer.component';
import { DetailComponent } from './pages/product-detail/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    NavigationComponent,
    FooterComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
