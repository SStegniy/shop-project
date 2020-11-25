import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductServiceService } from '../../shared/services/product-service.service';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  product: any;
  
  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.productService.getdbProducts().snapshotChanges().pipe(
      map(changes => 
        changes.map(prod => 
          ({ key: prod.payload.key, ...prod.payload.val() })
        )
      )
    ).subscribe(product => {
      this.product = product;
      console.log(product);
    });
    
  }

}
