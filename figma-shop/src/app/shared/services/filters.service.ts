import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { FilterData } from '../interfaces/filter-data.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  public filter: FilterData;
  public allProd: Array<ProductInterface>;

  constructor() { }

  filterAllProducts(products: Array<ProductInterface>): Array<ProductInterface> {
    if (!this.filter) {
        return products;
    } else {
      return products.filter(product => {
        return this.checkCategoryPresents(this.allProd) &&
          this.checkBrandsPresents(product) &&
          this.checkRatingPresents(product) &&
          this.checkPricePresents(product);
      });
    }
  }

  private checkCategoryPresents(products: Array<ProductInterface>): Array<ProductInterface> {
      if (this.filter.category === null) {
        return products;
      } else {
        return products.filter(prod => prod.category.toLowerCase() === this.filter.category.toLowerCase());
      }
  }

  private checkBrandsPresents(product: ProductInterface): boolean {
      if (this.filter.brand.includes(typeof 'string')){
        return this.filter.brand.includes(product.farm);
      } else {
        return false;
      }
  }

  private checkRatingPresents(product: ProductInterface): boolean {
    if (!this.filter.rating.length) {
      return this.filter.rating.includes(product.rating);
    } else {
      return false;
    }
  }

  private checkPricePresents(product: ProductInterface): boolean {
    if (this.filter.price) {
      return product.price >= this.filter.price[0] && product.price <= this.filter.price[1];
    } else {
      return false;
    }
  }
}
