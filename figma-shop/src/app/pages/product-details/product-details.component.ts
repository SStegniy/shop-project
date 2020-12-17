import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  public product: ProductInterface;
  private currentCategoryProducts: ProductInterface[];
  public currentCategoryProductsViewed: ProductInterface[];
  private currentCategoryIndex = 0;
  public starCount = [1, 2, 3, 4, 5];

  constructor(
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
    this.currentCategoryProducts = this.filterCurrentCategory(this.product.category);
    this.currentCategoryProductsViewed = this.getFourProducts();
  }

  private getProduct(): void {
    this.actRoute.data.subscribe((data) => {
      this.product = data.product[0];
      this.currentCategoryProducts = data.product[1];
    });
  }

  private filterCurrentCategory(category: string): ProductInterface[] {
    return this.currentCategoryProducts.filter((product: ProductInterface) => {
      return product.category === category;
    });
  }

  private getFourProducts(): ProductInterface[] {
    return this.currentCategoryProducts.slice(this.currentCategoryIndex, 4);
  }
}
