import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private database: AngularFireDatabase) { }

  public getOneProduct(id: number): Promise<ProductInterface> {
    return new Promise((resolve, reject) => {
      this.database.database.ref(`products/${id}`).once('value')
        .then(snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  public getAllProducts(): Promise<ProductInterface> {
    return this.database.database.ref('products').once('value').then(snap => snap.val());
  }
}
