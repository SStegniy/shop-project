import { Component, Input, OnInit } from '@angular/core';

import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductServiceService } from '../../shared/services/product-service.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public allProducts: Array<IProduct>;

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList(): void {
    this.productService.getDbProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(prod =>
          ({ id: prod.payload.key, ...prod.payload.val() })
        )
      )
    ).subscribe(product => {
      this.allProducts = product;
    });
  }
}
