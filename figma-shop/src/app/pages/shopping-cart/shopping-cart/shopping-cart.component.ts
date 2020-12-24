import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { countryList } from './countries-list';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public personForm: FormGroup;
  public countries: string[] = countryList;
  public filteredCountries: Observable<string[]>;
  public countriesFormControl = new FormControl();
  public totalPrice: number;
  public countStars = [1, 2, 3, 4, 5];
  public orderedProducts: ProductInterface[];

  constructor(
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.personForm = this.initPersonForm();
    this.filteredCountries = this.getFilteredCountries();
    this.orderedProducts = this.getProductFromLocal();
    this.getTotal();
    this.onFormChange();
  }

  private initPersonForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      country: this.countriesFormControl,
      city: new FormControl(),
      postal: new FormControl(),
    });
  }

  private onFormChange(): any {
    this.personForm.valueChanges.pipe(distinctUntilChanged()).subscribe(data => {
      console.log(data);
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

  public getProductFromLocal(): ProductInterface[] {
    if (localStorage.getItem('order')) {
      return JSON.parse(localStorage.getItem('order'));
    }
  }

  public removeProduct(id: number): void {
    this.orderService.removeProduct(id);
    const productIndex = this.orderedProducts.findIndex((prod: ProductInterface) => prod.id === id);
    this.orderedProducts.splice(productIndex, 1);
    this.getTotal();
  }

  public addToWishList(product: ProductInterface): void {
    console.log('To wish');
  }

  public changeProductCount(): void {
    localStorage.setItem('order', JSON.stringify(this.orderedProducts));
    this.getTotal();
    this.orderService.ordersInCart.next();
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

  public completeOrder(): void {
    const order = {
      personInfo: this.personForm.value,
      personOrder: this.orderedProducts
    };
    this.orderService.completeOrder(order);
  }
}
