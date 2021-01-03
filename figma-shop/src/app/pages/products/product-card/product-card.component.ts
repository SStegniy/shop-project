import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { WishListService } from '../../../shared/services/wish-list.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  @Input() product: ProductInterface;
  public starCount = [1, 2, 3, 4, 5];
  constructor(private wishService: WishListService) { }

  ngOnInit(): void {
  }

  public addToWishList(product: ProductInterface): void {
    product.count = 1; // --- add count!!
    this.wishService.addWishedProduct(product);
  }
}
