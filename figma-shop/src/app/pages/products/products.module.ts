import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterModule } from '../../shared/pipes/filter/filter.module';

import { ProductsComponent } from './products.component';
import { FilterComponent } from './filter/filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FooterComponent } from '../../components/footer/footer.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    FilterComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    FilterModule
  ]
})

export class ProductsModule {}
