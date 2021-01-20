import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AdminProductService } from '../../shared/services/admin-product.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../shared/services/snackbar.service';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  public addForm: FormGroup;
  public uploadImage: Observable<number>;
  public uploadImageUrl: string;
  private $subscription = new Subject();

  constructor(
    private afStorage: AngularFireStorage,
    private adminService: AdminProductService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.onFormChange();
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      category: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      freshness: new FormControl('', Validators.required),
      farm: new FormControl('', Validators.required),
      deliveryArea: new FormControl('', Validators.required),
      deliveryTime: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      sizes: new FormControl('', Validators.required),
      buyProperties: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      imgUrl: new FormControl(undefined, Validators.required),
      description: new FormGroup({
        main: new FormControl('', Validators.required),
        origins: new FormControl('', Validators.required),
        small: new FormControl('', Validators.required),
        howToCook: new FormControl('', Validators.required)
      })
    });
  }

  private onFormChange(): void {
    this.addForm.valueChanges.pipe(takeUntil(this.$subscription)).subscribe(data => {
      this.adminService.formValue = data;
    });
  }

  public uploadFile(): void {
    const file = this.addForm.get('imgUrl').value.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadImage = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.uploadImageUrl = url;
      });
    });
  }

  private removeFile(): void {
    this.uploadImageUrl = '';
  }

  public addProduct(): void {
    if (this.addForm.valid) {
      const newProd = this.adminService.formAnProduct();
      this.adminService.addNewProduct(newProd)
        .then(() => {
          this.closeDialog();
          this.snackbarService.snackMessage('New product was added!', true);
        })
        .catch(() => {
          this.snackbarService.snackMessage('Something went wrong', false);
        });
    } else {
      Object.keys(this.addForm.controls).forEach(field => {
        const control = this.addForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }

  private closeDialog(): void {
    this.dialog.closeAll();
  }
}
