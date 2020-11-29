import { Component, Input, OnInit } from '@angular/core';

import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ProductServiceService } from '../../shared/services/product-service.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public allProducts: Array<ProductInterface>;

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): any{
    this.productService.getDbProducts().snapshotChanges()
      .pipe(map(changes =>
        changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => this.allProducts = data);
  }
}
