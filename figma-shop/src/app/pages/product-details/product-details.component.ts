import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductServiceService } from '../../shared/services/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: any;
  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
  }

  updateActive(isActive: boolean) {
    this.productService
      .updateCustomer(this.product.key, { active: isActive })
      .catch(err => console.log(err));
  }
 
  deleteCustomer() {
    this.productService
      .deleteCustomer(this.product.key)
      .catch(err => console.log(err));
  }

}
