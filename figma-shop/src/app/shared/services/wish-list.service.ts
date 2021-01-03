import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { SnackbarService } from './snackbar.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private localWishKey = 'wished';
  public productsInWishList: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private snackbarService: SnackbarService) { }

  public getWishedProducts(): ProductInterface[] {
    if (localStorage.getItem(this.localWishKey)) {
      return JSON.parse(localStorage.getItem(this.localWishKey));
    }
  }

  public addWishedProduct(product: ProductInterface): void {
    let wishedInLocal: ProductInterface[] = [];
    if (localStorage.getItem(this.localWishKey)) {
      wishedInLocal = JSON.parse(localStorage.getItem(this.localWishKey));
      if (wishedInLocal.some((prod: ProductInterface) => prod.id === product.id)) {
        this.snackbarService.snackMessage('Already in wish list', false);
      } else {
        wishedInLocal.push(product);
      }
    } else {
      wishedInLocal.push(product);
    }
    localStorage.setItem(this.localWishKey, JSON.stringify(wishedInLocal));
    this.snackbarService.snackMessage('Add to wish list', true);
    this.productsInWishList.next(1);
  }

  public removeWishedProduct(id: number): void {
    const wishedProductInLocal: ProductInterface[] = JSON.parse(localStorage.getItem(this.localWishKey));
    const productIndex = wishedProductInLocal.findIndex((prod: ProductInterface) => prod.id === id);
    wishedProductInLocal.splice(productIndex, 1);
    localStorage.setItem(this.localWishKey, JSON.stringify(wishedProductInLocal));
    this.productsInWishList.next(1);
  }
}
