import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { FilterComponent } from './filter/filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
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
    NgxPaginationModule
  ]
})

export class ProductsModule {}
