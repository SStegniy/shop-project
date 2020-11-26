import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';

import { ProductsComponent } from '../../pages/products/products.component';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  exports: [
    ProductsComponent,
    ProductDetailsComponent
  ]
})
export class ProductModule { }
