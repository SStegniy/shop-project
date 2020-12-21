import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  public product: ProductInterface;
  private relatedProducts: ProductInterface[];
  public currentCategoryProductsViewed: ProductInterface[];
  private currentCategoryIndex = 0;
  public starCount = [1, 2, 3, 4, 5];

  constructor(
    private actRoute: ActivatedRoute,
    private prodService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getRelatedProducts(this.product.category);
  }

  private getProduct(): void {
    this.actRoute.data.subscribe((data) => {
      this.product = data.product;
    });
  }

  private getRelatedProducts(category: string): void {
    this.prodService.getAllProducts().then((data: ProductInterface[]) => {
      this.relatedProducts = data.filter((product: ProductInterface) => product.category === category);
      this.currentCategoryProductsViewed = this.getProductsByCounter(this.currentCategoryIndex);
    });
  }

  private getProductsByCounter(counter: number): ProductInterface[] {
    return this.relatedProducts.slice(counter, 4);
  }
}
