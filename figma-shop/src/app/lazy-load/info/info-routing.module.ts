import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoComponent } from './info.component';
import { ChatComponent } from '../../pages/chat/chat.component';
import { BlogComponent } from '../../pages/blog/blog.component';
import { AboutComponent } from '../../pages/about/about.component';
import { CareersComponent } from '../../pages/careers/careers.component';
import { BasketComponent } from '../../pages/basket/basket.component';


const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'basket', component: BasketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
