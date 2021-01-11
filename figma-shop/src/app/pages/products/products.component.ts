import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { FiltersService } from '../../shared/services/filters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {
  public dataSubscription: Subscription;
  public allProducts: ProductInterface[];
  public page = 1;
  public itemsPerPage = 5;
  public sortConditions = ['Default', 'price Small - Large', 'price Large - Small', 'rating Small - Large', 'rating Large - Small'];
  public sortValue = 'Default';
  private filterStatus = false;

  constructor(
    private productService: ProductService,
    private actRoute: ActivatedRoute,
    private filterService: FiltersService) { }

  ngOnInit(): void {
    this.handleProducts();
  }

  public handleProducts(): void {
    this.dataSubscription = this.actRoute.data.subscribe(data => {
      this.allProducts = data.products;
    });
  }

  get filteredProducts(): ProductInterface[] {
    return this.filterService.filterAllProducts([...this.allProducts]);
  }

  public showMoreProducts(): void {
    this.itemsPerPage += 5;
  }

  public onPageChange(page: number): void {
    window.scrollTo(0, 0);
    this.page = page;
    this.itemsPerPage = 5;
  }

  public toggleFilterDialog(): void {
    const status = !this.filterStatus;
    this.filterService.showHideFilter(status);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
