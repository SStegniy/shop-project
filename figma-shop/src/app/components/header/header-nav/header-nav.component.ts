import { Component, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { BreadcrumbsInterface } from '../../../shared/interfaces/breadcrumbs.interface';
import { OrderService } from '../../../shared/services/order.service';
import { ProductInterface } from '../../../shared/interfaces/product.interface';

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
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.checkBreadCrumbs();
    this.checkCart();
    this.getLocalProducts();
  }

  private checkBreadCrumbs(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof ActivationStart) {
        this.breadcrumbs = data.snapshot.data.crumbs;
      }
    });
  }

  private checkCart(): void {
    this.orderService.ordersInCart.subscribe(() => {
      this.getLocalProducts();
    });
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('order')) {
      this.productsInCart = JSON.parse(localStorage.getItem('order'));
      this.countOfProducts = this.productsInCart.reduce((total: number, prod: ProductInterface) => {
        return total + prod.count;
      }, 0);
    } else {
      this.countOfProducts = 0;
    }
  }
}
