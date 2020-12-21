import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProdDetailsResolver } from './details.resolver';
import { FooterModule } from '../../components/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
    resolve: { product: ProdDetailsResolver },
    data: {
      label: 'details'
    }
  }
];

@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FooterModule
  ],
  providers: [ProdDetailsResolver]
})

export class ProductDetailsModule {}
