import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersInCart: Subject<number> = new Subject<number>();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar) { }

  public addProduct(product: ProductInterface): void {
    let localProducts: ProductInterface[] = [];
    if (localStorage.getItem('order')) {
      localProducts = JSON.parse(localStorage.getItem('order'));
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
    localStorage.setItem('order', JSON.stringify(localProducts));
    this.ordersInCart.next();
  }

  public removeProduct(id: number): void {
    const localProducts: ProductInterface[] = JSON.parse(localStorage.getItem('order'));
    const productIndex = localProducts.findIndex((prod: ProductInterface) => prod.id === id);
    localProducts.splice(productIndex, 1);
    localStorage.setItem('order', JSON.stringify(localProducts));
    this.ordersInCart.next();
  }

  public completeOrder(order): void {
    if (localStorage.getItem('order')) {
      localStorage.removeItem('order');
      this.router.navigateByUrl('');
      this.snackBar.open('Order confirmed!', 'Done', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      });
    } else {
      this.snackBar.open('No products to order', 'Done', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      });
    }
    this.ordersInCart.next();
  }
}
