import {Component, OnInit, Input} from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;
  public starCount = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
  }
}

