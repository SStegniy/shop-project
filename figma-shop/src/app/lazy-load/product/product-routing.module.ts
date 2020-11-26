import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
