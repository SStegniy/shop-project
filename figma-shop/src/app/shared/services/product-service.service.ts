import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService implements Resolve<number> {
  public allProducts: Observable<Array<any>>;
  public prodRef: AngularFireList<ProductInterface> = null;

  constructor(private database: AngularFireDatabase) {
    this.prodRef = database.list('products');
    console.log(this.prodRef);
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<number> | Promise<number> | number{
      return;
  }

  public getDbProducts(): AngularFireList<ProductInterface>{
    return this.prodRef;
  }

  public getOneProduct(id: number): any {
    return this.database.list('products').valueChanges()
      .pipe();
  }
}
