import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './all-products/products/product-card/product-card.component';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';


@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HeaderModule,
    FooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
