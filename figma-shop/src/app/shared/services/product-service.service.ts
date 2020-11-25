import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private dbPath = '/products';

  productRef: AngularFireList<Product> = null;

  constructor(private database: AngularFireDatabase) { 
    this.productRef = database.list(this.dbPath)
  }

  createCustomer(product: any): void {
    this.productRef.push(product);
  }
 
  updateCustomer(key: string, value: any): Promise<void> {
    return this.productRef.update(key, value);
  }
 
  deleteCustomer(key: string): Promise<void> {
    return this.productRef.remove(key);
  }
 
  getdbProducts(): AngularFireList<any> {
    return this.productRef;
  }
 
  deleteAll(): Promise<void> {
    return this.productRef.remove();
  }

  
}
