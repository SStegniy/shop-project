import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTopComponent } from './components/header/header-top/header-top.component';
import { HeaderNavComponent } from './components/header/header-nav/header-nav.component';
import { HeaderBreadcrumbsComponent } from './components/header/header-breadcrumbs/header-breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderTopComponent,
    HeaderNavComponent,
    HeaderBreadcrumbsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
