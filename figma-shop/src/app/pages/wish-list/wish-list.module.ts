import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListComponent } from './wish-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '../../components/footer/footer.module';

const routes: Routes = [
  { path: '',
    component: WishListComponent
  }
];

@NgModule({
  declarations: [
    WishListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FooterModule
  ],
  exports: [RouterModule]
})
export class WishListModule { }
