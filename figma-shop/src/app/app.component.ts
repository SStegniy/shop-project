import {Component} from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'figma-shop';
  componentRemoveFooter = ['ShoppingCartComponent'];
  isFooterDisplayed = 'show-footer';

  componentAdded(e: Event): void {
    this.isFooterDisplayed = this.componentRemoveFooter.includes(e.constructor.name) ? 'hide' : 'show';
  }
}
