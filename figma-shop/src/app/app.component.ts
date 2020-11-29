import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Event, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'figma-shop';
  visibility: any;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.visibility = this.router.url;
        }
      });
  }
}
