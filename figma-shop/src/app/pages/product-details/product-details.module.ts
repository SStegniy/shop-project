import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProdDetailsResolver } from './details.resolver';
import { FooterModule } from '../../components/footer/footer.module';
import { FormsModule } from '@angular/forms';

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
      FooterModule,
      FormsModule
    ],
  providers: [ProdDetailsResolver]
})

export class ProductDetailsModule {}
