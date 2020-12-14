import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { FilterData } from '../interfaces/filter-data.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  public filter: FilterData;

  constructor() { }

  getFilterData(data): void {
    this.filter = data;
  }

  filterAllProducts(products: ProductInterface[]): ProductInterface[] {
    if (!this.filter || this.filter.category === null && this.filter.brand.length === 0 &&
      this.filter.rating.length === 0) {
        return products;
    } else {
      return this.checkCategoryPresents(products).filter(product => {
        return this.checkBrandsPresents(product) && this.checkRatingPresents(product) &&
          this.checkPricePresents(product);
      });
    }
  }

  private checkCategoryPresents(products: ProductInterface[]): ProductInterface[] {
    return products.filter(product => {
      if (this.filter.category) {
        return product.category.toLowerCase() === this.filter.category.toLowerCase();
      }
      else {
        return !!product;
      }
    });

  }

  private checkBrandsPresents(product: ProductInterface): boolean {
      if (this.filter.brand?.length) {
        return this.filter.brand.includes(product.farm.toLowerCase());
      }
      else {
        return !!product;
      }
  }

  private checkRatingPresents(product: ProductInterface): boolean {
    if (this.filter.rating?.length) {
      return this.filter.rating.includes(product.rating);
    }
    else {
      return !!product;
    }
  }

  private checkPricePresents(product: ProductInterface): boolean {
    if (this.filter.price?.length) {
      return this.filter.price[0] <= product.price && this.filter.price[1] >= product.price;
    }
    else {
      return !!product;
    }
  }
}
