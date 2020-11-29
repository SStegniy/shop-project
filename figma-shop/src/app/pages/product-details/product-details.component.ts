import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../shared/services/product-service.service';
import { ProductInterface } from '../../shared/interfaces/product.interface';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private product: ProductInterface;
  public starCount = [1, 2, 3, 4, 5];
  public routeData: any;
  constructor(
    private actRoute: ActivatedRoute,
    private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.actRoute.data.subscribe(data => console.log(data));
    console.log(this.routeData);
  }
}
