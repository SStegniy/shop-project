import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { FilterData } from '../../shared/interfaces/filter-data.interface';
import { FiltersService } from '../../shared/services/filters.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public allProducts: Array<ProductInterface>;
  public page = 1;
  public formData: FilterData;

  constructor(
    private productService: ProductService,
    private actRoute: ActivatedRoute,
    private filterService: FiltersService) { }

  ngOnInit(): void {
    this.actRoute.data.subscribe(data => {
      this.allProducts = data.products;
    });
  }

  public addForm(data): void {
    this.formData = data;
  }

  public filteredProducts(): ProductInterface[] {
    return this.filterService.filterAllProducts(this.allProducts);
  }
}
