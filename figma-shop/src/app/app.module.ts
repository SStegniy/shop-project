import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTopComponent } from './components/header/header-top/header-top.component';
import { HeaderNavComponent } from './components/header/header-nav/header-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCardModule } from './components/product-card/product-card.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderTopComponent,
    HeaderNavComponent,
    FooterComponent,
    CareersComponent,
    ChatComponent,
    ProductDetailsComponent,
    ProductsComponent,
    AboutComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ProductCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
