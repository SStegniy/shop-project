import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ProductInterface } from '../interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  public prodRef: AngularFireList<ProductInterface> = null;
  constructor(private database: AngularFireDatabase) {
    this.prodRef = database.list('products');
  }
  public getDbProducts(): AngularFireList<ProductInterface>{
    return this.prodRef;
  }
  public getOneProduct(id: number): Promise<ProductInterface> {
    return new Promise((resolve, reject) => {
      this.database.database.ref(`products/${id}`).once('value')
        .then(snapshot => {
          resolve(snapshot.val());
        });
    });
  }
}
