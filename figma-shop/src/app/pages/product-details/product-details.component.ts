import { Component, Input, OnInit } from '@angular/core';
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
}
