import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { countryList } from './countries-list';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { OrderService } from '../../../shared/services/order.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public personForm: FormGroup;
  public countries: string[] = countryList;
  public filteredCountries: Observable<string[]>;
  public countriesFormControl = new FormControl('', [Validators.required]);
  public totalPrice: number;
  public countStars = [1, 2, 3, 4, 5];
  public orderedProducts: ProductInterface[];
  private emailRegExp = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private phoneRegExp = '((\\+38)?\\(?\\d{3}\\)?[\\s\\.-]?(\\d{7}|\\d{3}[\\s\\.-]\\d{2}[\\s\\.-]\\d{2}|\\d{3}-\\d{4}))';

  constructor(
    private orderService: OrderService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.personForm = this.initPersonForm();
    this.filteredCountries = this.getFilteredCountries();
    this.orderedProducts = this.getProductFromLocal();
    this.getTotal();
  }

  private initPersonForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegExp)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegExp)]),
      address: new FormControl('', [Validators.required]),
      country: this.countriesFormControl,
      city: new FormControl('', [Validators.required]),
      postal: new FormControl(),
    });
  }

  private getFilteredCountries(): Observable<string[]> {
    return this.countriesFormControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterCountries(value))
    );
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter((country: string) => country.toLowerCase().includes(filterValue));
  }

  private getProductFromLocal(): ProductInterface[] {
    return this.orderService.getOrderFromLocalStorage();
  }

  private getTotal(): void {
    if (this.orderedProducts) {
      this.totalPrice = this.orderedProducts.reduce((total: number, prod: ProductInterface) => {
        return total + (prod.price * prod.count);
      }, 0);
    } else {
      this.totalPrice = 0;
    }
  }

  public removeProduct(id: number): void {
    this.orderService.deleteProductFromLocalStorage(id);
    const productIndex = this.orderedProducts.findIndex((prod: ProductInterface) => prod.id === id);
    this.orderedProducts.splice(productIndex, 1);
    this.getTotal();
  }

  public addToWishList(product: ProductInterface): void {
    this.snackbarService.snackMessage(`${product.title} was added to wish list`, true);
  }

  public changeProductCount(): void {
    this.orderService.changeOrderCountInLocalStorage(this.orderedProducts);
    this.getTotal();
    this.orderService.ordersInCart.next(1);
  }

  public completeOrder(): void {
    const order = {
      personInfo: this.personForm.value,
      personOrder: this.orderedProducts
    };
    this.orderService.completeOrder(order);
  }
}
