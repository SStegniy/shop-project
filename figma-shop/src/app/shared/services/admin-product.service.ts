import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductInterface } from '../interfaces/product.interface';
import { DescriptionInterface } from '../interfaces/description.interface';
import { MessageInterface } from '../interfaces/message.interface';
import { Product } from '../models/product.model';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  public search = new BehaviorSubject('');
  public products: ProductInterface[] = [];
  public formValue: any;
  public prodSubscription = new BehaviorSubject<string>('true');

  constructor(private db: AngularFireDatabase) { }

  public addNewProduct(product: ProductInterface): Promise<ProductInterface> {
    return this.db.database.ref('products').child(`${product.id}`).set(product);
  }

  public formAnProduct(): ProductInterface {
    const values = this.formValue;
    const previousPrice = values.price * 0.9;
    const id = this.createID();
    const description: DescriptionInterface = {
      small: values.description.small,
      main: values.description.main,
      origins: values.description.origins,
      howToCook: values.description.howToCook,
    };
    const messages: MessageInterface[] = [{
      author: '',
      date: new Date(),
      body: ''
    }];
    const newProduct = new Product(id,
      values.category, values.title, 4, values.price, previousPrice,
      values.freshness, values.farm, values.deliveryArea, values.deliveryTime, values.country,
      values.color, values.sizes, values.buyProperties, values.stock, values.imgUrl, 1,
      description, messages, messages);
    return newProduct;
  }

  public createID(): number {
    return this.products.length;
  }

  public getAuthUser(): UserInterface {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
