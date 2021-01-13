import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { FiltersService } from '../../../shared/services/filters.service';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})

export class FilterComponent implements OnInit, OnDestroy {
  public objectKeys = Object.keys;
  private allProducts: ProductInterface[];
  public allCategories = {};
  public allBrands: string[] = [];
  public allRatings: number[] = [5, 4, 3, 2, 1];
  public form: FormGroup;
  public sliderValue = 90;
  public sliderHighValue = 400;
  public sliderOptions: Options = {
    floor: 0,
    ceil: 400
  };
  public min: number;
  public max: number;

  private checkedBrands: string[] = [];
  private checkedRatings: number[] = [];

  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;
  public isMobileLayout = false;
  public filterStatus: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FiltersService,
    private prodService: ProductService) { }

  ngOnInit(): void {
    this.allProducts = this.prodService.products.getValue();
    this.allCategories = this.getCategories();
    this.allBrands = this.getBrands();
    this.form = this.createFormGroup();
    this.formOnChange();
    this.toggleFilterForm();
    this.checkIfMobileLayout();
  }

  private formOnChange(): void {
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(data => {
      this.filterService.getFilterData({
        category: data.category,
        brand: this.checkedBrands,
        rating: this.checkedRatings,
        price: [data.price[0], data.price[1]]
      });
      [ this.min , this.max] = data.price;
    });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      category: new FormControl(),
      brand: this.formBuilder.array(this.allBrands.map(() => new FormControl(false))),
      rating: this.formBuilder.array(this.allRatings.map(() => new FormControl(false))),
      price: new FormControl()
    });
  }

  private getCategories(): any {
    const categories = [];
    this.allProducts.forEach(prod => categories.push(prod.category.toLowerCase()));
    return categories.reduce((count, elem) => {
      count[elem] = count[elem] ? count[elem] += 1 : 1;
      return count;
    }, {});
  }

  private getBrands(): string[] {
    const brands: string[] = [];
    this.allProducts.forEach((prod: ProductInterface) => {
      brands.push(prod.farm.toLowerCase());
    });
    return [...new Set(brands)];
  }

  public checkboxBrandValue(index: number): void {
    const brandName = this.allBrands.find((elem, i) => i === index);
    if (this.checkedBrands.includes(brandName)) {
      const indexToDelete = this.checkedBrands.findIndex(elem => elem === brandName);
      this.checkedBrands.splice(indexToDelete, 1);
    } else {
      this.checkedBrands.push(brandName);
    }
  }

  public checkboxRatingValue(rating: number): void {
    if (this.checkedRatings.includes(rating)) {
      const indexToDelete = this.checkedRatings.findIndex(elem => elem === rating);
      this.checkedBrands.splice(indexToDelete, 1);
    } else {
      this.checkedRatings.push(rating);
    }
  }

  public resetForm(): void {
    this.form.reset({
      category: null,
      brand: [],
      rating: [],
      price: [0, this.max]
    });
    this.filterService.filter = null;
  }

  public toggleFilterForm(): void {
    this.filterService.filterStatus.subscribe(status => {
      this.filterStatus = status;
    });
  }

  public closeFilter(): void {
    this.filterStatus = false;
  }

  private checkIfMobileLayout(): void {
    this.isMobileLayout = window.innerWidth <= 998;
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( (event) => {
      const window = event.target as Window;
      this.isMobileLayout = window.innerWidth <= 998;
    });
  }

  public ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }
}
