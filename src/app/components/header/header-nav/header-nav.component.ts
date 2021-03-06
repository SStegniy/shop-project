import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BreadcrumbsInterface } from '../../../shared/interfaces/breadcrumbs.interface';
import { OrderService } from '../../../shared/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import { WishListService } from '../../../shared/services/wish-list.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})

export class HeaderNavComponent implements OnInit, OnDestroy {
  public breadcrumbs: BreadcrumbsInterface[];
  public countOfProducts = 0;
  public countOfWishList = 0;
  public burgerStatus = false;
  public searchStatus = false;
  private subscription = new Subject();

  constructor(
    private router: Router,
    private orderService: OrderService,
    private wishService: WishListService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkBreadCrumbs();
    this.checkCart();
    this.checkWishList();
  }

  private checkBreadCrumbs(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.breadcrumbs = data.state.root.children[0].children[0].data.crumbs;
      }
    });
  }

  private checkWishList(): void {
    this.wishService.productsInWishList.pipe(takeUntil(this.subscription)).subscribe(() => {
      this.getCountOfWishList();
    });
  }

  private checkCart(): void {
    this.orderService.ordersInCart.pipe(takeUntil(this.subscription)).subscribe(() => {
      this.getCountOfProducts();
    });
  }

  private getCountOfProducts(): void {
    this.countOfProducts = this.orderService.getCountOfProducts();
  }

  private getCountOfWishList(): void {
    this.countOfWishList = this.wishService.getCountOfWish();
  }

  public openDialog(): void {
    this.dialog.open(LoginDialogComponent, {});
  }

  public toggleBurger(): void {
    this.searchStatus = false;
    this.burgerStatus = !this.burgerStatus;
  }

  public toggleSearch(): void {
    this.burgerStatus = false;
    this.searchStatus = !this.searchStatus;
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
