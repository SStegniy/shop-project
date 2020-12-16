import { Component, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { BreadcrumbsInterface } from '../../../shared/interfaces/breadcrumbs.interface';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})

export class HeaderNavComponent implements OnInit {
  public breadcrumbs: BreadcrumbsInterface[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkBreadCrumbs();
  }

  private checkBreadCrumbs(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof ActivationStart) {
        this.breadcrumbs = data.snapshot.data.crumbs;
      }
    });
  }
}
