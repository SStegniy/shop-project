import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductsComponent } from './products.component';
import { FilterComponent } from './filter/filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SortingModule } from '../../shared/pipes/sorting/sorting.module';
import { FooterModule } from '../../components/footer/footer.module';

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
    FilterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    SortingModule,
    FooterModule
  ],
  providers: []
})

export class ProductsModule {}
