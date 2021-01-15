import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../shared/interfaces/product.interface';
import { WishListService } from '../../shared/services/wish-list.service';
import { OrderService } from '../../shared/services/order.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { UserInterface } from '../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  public products: ProductInterface[];
  public user: UserInterface;
  constructor(
    private wishService: WishListService,
    private orderService: OrderService,
    private authService: AuthService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.products = this.getWishedProducts();
    this.user = this.getUser();
  }

  private getWishedProducts(): ProductInterface[] {
    return this.wishService.getWishedProducts();
  }

  private getUser(): UserInterface {
    return this.authService.getUserFromLocalStorage();
  }

  public removeProduct(id: number, index: number): void {
    this.products.splice(index, 1);
    this.wishService.removeWishedProduct(id);
  }

  public addToCart(product: ProductInterface): void {
    if (this.user) {
      this.snackbarService.snackMessage('Add to Cart', true);
      this.orderService.setOrderToLocalStorage(product);
    }
    else {
      this.snackbarService.snackMessage('Please log in', false);
    }
  }

}
