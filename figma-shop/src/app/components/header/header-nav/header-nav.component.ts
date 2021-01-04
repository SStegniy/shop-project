import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BreadcrumbsInterface } from '../../../shared/interfaces/breadcrumbs.interface';
import { OrderService } from '../../../shared/services/order.service';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})

export class HeaderNavComponent implements OnInit {
  public breadcrumbs: BreadcrumbsInterface[];
  public countOfProducts = 0;
  private productsInCart: ProductInterface[] = [];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkBreadCrumbs();
    this.checkCart();
  }

  private checkBreadCrumbs(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.breadcrumbs = data.state.root.children[0].children[0].data.crumbs;
      }
    });
  }

  private checkCart(): void {
    this.orderService.ordersInCart.subscribe(() => {
      this.getCountOfProducts();
    });
  }

  private getCountOfProducts(): void {
    if (localStorage.getItem('order')) {
      this.productsInCart = JSON.parse(localStorage.getItem('order'));
      this.countOfProducts = this.productsInCart.reduce((total: number, prod: ProductInterface) => {
        return total + prod.count;
      }, 0);
    } else {
      this.countOfProducts = 0;
    }
  }

  public openDialog(): void {
    this.dialog.open(LoginDialogComponent, {});
  }
}
