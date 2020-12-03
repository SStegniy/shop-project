import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProdDetailsResolver } from './details.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
    resolve: { product: ProdDetailsResolver }
  }
];

@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})

export class ProductDetailsModule {}
