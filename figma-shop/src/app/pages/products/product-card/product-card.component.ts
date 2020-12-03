import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  @Input() product: ProductInterface;
  public starCount = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
  }
}
