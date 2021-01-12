import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsResolver } from './pages/products/all-products.resolver';
import { AuthGuard } from './shared/guards/auth.guard';
import { DeactivateGuard } from './shared/guards/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
    resolve: { products: AllProductsResolver },
    data : {
      crumbs: [
        { label: 'home', url: '' },
        { label: 'all products', url: 'products' },
      ]
    }
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule),
    data: {
      crumbs: [
        { label: 'home', url: ''},
        { label: 'all products', url: 'products' },
        { label: 'details', url: 'products/:id' }
      ]
    }
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
    canActivate: [AuthGuard],
    canDeactivate: [DeactivateGuard],
    data: {
      crumbs: [
        { label: 'home', url: '' },
        { label: 'order', url: 'shopping-cart' },
      ]
    }
  },
  {
    path: 'wish-list',
    loadChildren: () => import('./pages/wish-list/wish-list.module').then(m => m.WishListModule),
    data: {
      crumbs: [
        { label: 'home', url: '' },
        { label: 'wish list', url: 'wish-list' },
      ]
    }
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'careers',
    loadChildren: () => import('./pages/careers/careers.module').then(m => m.CareersModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
