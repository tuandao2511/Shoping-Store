import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from './enum/Role';
import { AuthGuard } from './guard/auth.guard';
import { CardComponent } from './pages/card/card/card.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { LoginComponent } from './pages/login/login/login.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderComponent } from './pages/order/order.component';
import { DetailComponent } from './pages/product-detail/detail/detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list/product-list.component';
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
    },
    {
      path: 'order',
      component: OrderComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'order/:id', 
      component: OrderDetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'seller/product',
      component: ProductListComponent,
      canActivate: [AuthGuard],
      data: {roles: [Role.Manager, Role.Employee]}
    },
    {
      path: 'seller', 
      redirectTo: 'seller/product', 
      pathMatch: 'full'
    },
    {
      path: 'seller/product/:id/edit',
      component: ProductEditComponent,
      canActivate: [AuthGuard],
      data: {roles: [Role.Manager, Role.Employee]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
