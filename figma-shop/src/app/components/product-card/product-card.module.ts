import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardRoutingModule } from './product-card-routing.module';
import { ProductCardComponent } from './product-card.component';


@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    CommonModule,
    ProductCardRoutingModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
