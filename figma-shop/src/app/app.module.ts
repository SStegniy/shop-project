import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { HeaderModule } from './components/header/header.module';
import { SortingModule } from './shared/pipes/sorting/sorting.module';
import { AllProductsResolver } from './pages/products/all-products.resolver';
import { FooterModule } from './components/footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HeaderModule,
    FooterModule,
    SortingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  providers: [AllProductsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
