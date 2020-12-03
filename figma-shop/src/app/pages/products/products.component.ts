import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ProductServiceService } from '../../shared/services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public allProducts: Array<ProductInterface>;
  public productsViewed: Array<ProductInterface> = [];
  public page = 1;

  constructor(
    private productService: ProductServiceService,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.data.subscribe(data => {
      this.allProducts = data.products;
    });
  }

}
