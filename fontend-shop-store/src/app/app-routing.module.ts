import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './pages/card/card/card.component';
import { DetailComponent } from './pages/product-detail/detail/detail.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
