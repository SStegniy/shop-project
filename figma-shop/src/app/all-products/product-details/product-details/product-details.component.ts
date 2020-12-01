import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../../../shared/services/product-service.service';
import { ProductInterface } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private product: ProductInterface;
  public starCount = [1, 2, 3, 4, 5];
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    const id = +this.actRoute.snapshot.params.id;
    this.productService.getOneProduct(id).then(data => this.product = data);
  }
}
