import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { HeaderModule } from './components/header/header.module';
import { SortingModule } from './shared/pipes/sorting/sorting.module';
import { AllProductsResolver } from './pages/products/all-products.resolver';
import { FooterModule } from './components/footer/footer.module';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    ConfirmationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        HeaderModule,
        FooterModule,
        SortingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
  providers: [AllProductsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
