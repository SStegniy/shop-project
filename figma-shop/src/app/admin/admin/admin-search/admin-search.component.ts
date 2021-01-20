import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProductService } from '../../../shared/services/admin-product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../../../components/add-dialog/add-dialog.component';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminSearchComponent implements OnInit, OnDestroy {
  public search = new FormControl();
  private $subscription = new Subject();

  constructor(
    private adminService: AdminProductService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onSearchChange();
  }

  private onSearchChange(): void {
    this.search.valueChanges.pipe(takeUntil(this.$subscription)).subscribe(data => {
      this.adminService.search.next(data);
    });
  }

  public openDialog(): void {
    this.dialog.open(AddDialogComponent, { panelClass: 'add-dialog-container', autoFocus: false });
  }

  ngOnDestroy(): void {
    this.$subscription.next();
    this.$subscription.complete();
  }
}
