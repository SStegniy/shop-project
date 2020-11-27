import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private dbPath = '/products';

  productRef: AngularFireList<Product> = null;

  constructor(private database: AngularFireDatabase) {
    this.productRef = database.list(this.dbPath);
  }

  public getDbProducts(): AngularFireList<any> {
    return this.productRef;
  }
}
