import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';

import { ChatComponent } from '../../pages/chat/chat.component';
import { BlogComponent } from '../../pages/blog/blog.component';
import { AboutComponent } from '../../pages/about/about.component';
import { CareersComponent } from '../../pages/careers/careers.component';


@NgModule({
  declarations: [
    InfoComponent,
    ChatComponent,
    BlogComponent,
    AboutComponent,
    CareersComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule
  ],
  exports: [
    ChatComponent,
    BlogComponent,
    AboutComponent,
    CareersComponent
  ]
})
export class InfoModule { }
