import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './pages/card/card/card.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { LoginComponent } from './pages/login/login/login.component';
import { DetailComponent } from './pages/product-detail/detail/detail.component';
import { SignUpComponent } from './pages/sign-up/sign-up/sign-up.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/product',
      pathMatch: 'full'
    },
    {
      path: 'product',
      component: CardComponent
    },
    {
      path: 'category/:id',
      component: CardComponent
    },
    {
      path: 'product/:id',
      component: DetailComponent
    }
    ,{
      path: 'cart',
      component: CartComponent
    }
    ,{
      path: 'register',
      component: SignUpComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
