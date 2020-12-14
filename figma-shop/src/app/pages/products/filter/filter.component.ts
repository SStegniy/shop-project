import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { FiltersService } from '../../../shared/services/filters.service';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  private allProducts: ProductInterface[];
  public allCategories = [];
  public allBrands = [];
  public allRatings = [5, 4, 3, 2, 1];
  public form: FormGroup;
  public sliderValue = 90;
  public sliderHighValue = 300;
  public sliderOptions: Options = {
    floor: 0,
    ceil: 400
  };
  public min: number;
  public max: number;

  private checkedBrands: string[] = [];
  private checkedRatings: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FiltersService,
    private prodService: ProductService) { }

  ngOnInit(): void {
    this.allProducts = this.prodService.products.getValue();
    this.getCategories();
    this.getBrands();
    this.createFormGroup();
    this.formOnChange();
  }

  private formOnChange(): void {
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(data => {
      this.max = data.price[1];
      this.min = data.price[0];
      this.filterService.getFilterData({
        category: data.category,
        brand: this.checkedBrands,
        rating: this.checkedRatings,
        price: [data.price[0], data.price[1]]
      });
    });
  }

  private createFormGroup(): void {
    this.form = this.formBuilder.group({
      category: new FormControl(),
      brand: this.formBuilder.array(this.allBrands.map(elem => new FormControl(false))),
      rating: this.formBuilder.array(this.allRatings.map(elem => new FormControl(false))),
      price: new FormControl()
    });
  }

  private getCategories(): void {
    const categories = [];
    this.allProducts.forEach(prod => {
      categories.push(prod.category.toLowerCase());
    });
    this.allCategories = [...new Set(categories)];
  }

  private getBrands(): void {
    const brands = [];
    this.allProducts.forEach(prod => {
      brands.push(prod.farm.toLowerCase());
    });
    this.allBrands = [...new Set(brands)];
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
}
