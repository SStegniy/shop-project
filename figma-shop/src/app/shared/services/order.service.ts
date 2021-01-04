import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderStorageKey = 'order';
  public ordersInCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private router: Router,
    private snackbarService: SnackbarService) { }

  public setOrderToLocalStorage(product: ProductInterface): void {
    let localProducts: ProductInterface[] = [];
    if (localStorage.getItem(this.orderStorageKey)) {
      localProducts = JSON.parse(localStorage.getItem(this.orderStorageKey));
      if (localProducts.some((prod: ProductInterface) => prod.id === product.id)) {
        const index = localProducts.findIndex((prod: ProductInterface) => prod.id === product.id);
        localProducts[index].count += product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem(this.orderStorageKey, JSON.stringify(localProducts));
    this.ordersInCart.next(1);
  }

  public changeOrderCountInLocalStorage(products: ProductInterface[]): void {
    localStorage.setItem(this.orderStorageKey, JSON.stringify(products));
  }

  public getOrderFromLocalStorage(): ProductInterface[] {
    if (localStorage.getItem(this.orderStorageKey)) {
      return JSON.parse(localStorage.getItem(this.orderStorageKey));
    }
  }

  public deleteProductFromLocalStorage(id: number): void {
    const localProducts: ProductInterface[] = JSON.parse(localStorage.getItem(this.orderStorageKey));
    const productIndex = localProducts.findIndex((prod: ProductInterface) => prod.id === id);
    localProducts.splice(productIndex, 1);
    localStorage.setItem(this.orderStorageKey, JSON.stringify(localProducts));
    this.ordersInCart.next(1);
  }

  public removeOrderFromLocalStorage(): void {
    localStorage.removeItem(this.orderStorageKey);
    this.ordersInCart.next(0);
  }

  public completeOrder(order: any): void {
    if (localStorage.getItem(this.orderStorageKey)) {
      localStorage.removeItem(this.orderStorageKey);
      this.router.navigateByUrl('');
      this.snackbarService.snackMessage('Order confirmed!', true);
    } else {
      this.snackbarService.snackMessage('No products to order', false);
    }
    this.ordersInCart.next(1);
  }
}
