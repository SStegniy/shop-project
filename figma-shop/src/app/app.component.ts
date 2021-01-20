import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'figma-shop';
  public showHead: boolean;

  constructor(private router: Router) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('/admin')) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }

}
