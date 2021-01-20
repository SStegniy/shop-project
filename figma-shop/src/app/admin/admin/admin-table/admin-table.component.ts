import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminProductService } from '../../../shared/services/admin-product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit, AfterViewInit, OnDestroy {
  public products: ProductInterface[] = [];

  public displayedColumns: string[] = ['id', 'title', 'category', 'price', 'rating', 'stock' ];
  public dataSource = new MatTableDataSource<ProductInterface>(this.products);

  private $subscription = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private prodService: ProductService,
    private adminService: AdminProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.checkSearchValue();
    this.getRelevantProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getProducts(): void {
    this.adminService.prodSubscription.pipe(takeUntil(this.$subscription)).subscribe(() => {
      this.prodService.getAllProducts().then((data: ProductInterface[]) => {
        this.products = data;
        this.dataSource.data = data as ProductInterface[];
        this.adminService.products = this.products;
      });
    });
  }

  private checkSearchValue(): void {
    this.adminService.search.pipe(takeUntil(this.$subscription)).subscribe((data) => {
      this.applyFilter(data);
    });
  }

  private getRelevantProducts(): void {
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.title.toLowerCase().includes(filter)
        || data.id.toString().toLowerCase().includes(filter)
        || data.category.toLowerCase().includes(filter)
        || data.price.toString().includes(filter)
        || data.rating.toString() === filter;
    };
  }

  private applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.$subscription.next();
    this.$subscription.complete();
  }
}
