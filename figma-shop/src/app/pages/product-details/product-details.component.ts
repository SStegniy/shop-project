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
  public starCount = [1, 2, 3, 4, 5];

  constructor(
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    this.actRoute.data.subscribe((data) => {
      this.product = data.product;
    });
  }
}
