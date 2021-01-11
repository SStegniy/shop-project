import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderTopComponent } from './header-top/header-top.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderTopComponent,
    HeaderNavComponent
  ],
    imports: [
      CommonModule,
      RouterModule,
    ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
