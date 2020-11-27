import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../shared/services/product-service.service';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private product: Array<IProduct>;
  public starCount = [1, 2, 3, 4, 5];
  constructor(
    private actRoute: ActivatedRoute,
    private productService: ProductServiceService
  ) { }

  ngOnInit(): void {
  }
}
