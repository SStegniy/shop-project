import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductServiceService } from './shared/services/product-service.service';

import { AboutComponent } from './pages/about/about.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { BlogComponent } from './pages/blog/blog.component';


let routes: Routes;
routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'careers', component: CareersComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'product/:id', component: ProductDetailsComponent, resolve: { id: ProductServiceService }},
  {path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
