import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSearchComponent } from './admin/admin-search/admin-search.component';
import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { AddDialogComponent } from '../components/add-dialog/add-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: '', redirectTo: 'admin-products', pathMatch: 'full'
      },
      {
        path: 'admin-products', component: AdminTableComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminSearchComponent,
    AdminTableComponent,
    AddDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }
