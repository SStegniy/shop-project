import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductInterface } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products = new BehaviorSubject([]);
  constructor(private database: AngularFireDatabase) { }

  public getOneProduct(id: number): Promise<ProductInterface> {
    return new Promise((resolve, reject) => {
      this.database.database.ref(`products/${id}`).once('value')
        .then(snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  public getAllProducts(): Promise<ProductInterface[]> {
    return new Promise((resolve, reject) => {
      return this.database.database.ref('products').once('value')
        .then(snap => {
          this.products.next(snap.val());
          resolve(snap.val());
        });
    });
  }
}
