import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public productCount = 1;
  public starCount = [1, 2, 3, 4, 5];

  constructor(
    private actRoute: ActivatedRoute,
    private prodService: ProductService,
    private orderService: OrderService,
    private snackBar: MatSnackBar) { }

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

  public addToCart(product: ProductInterface, count: number): void {
    // ------- add counter for product
    product.count = count;
    // ------- add counter for product
    this.orderService.addProduct(product);
    this.productCount = 1;
    this.snackBar.open('Added to cart', 'Done', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
