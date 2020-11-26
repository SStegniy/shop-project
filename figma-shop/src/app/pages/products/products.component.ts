import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductServiceService } from '../../shared/services/product-service.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: Array<IProduct>;
  
  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList(): void {
    this.productService.getdbProducts().snapshotChanges().pipe(
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
