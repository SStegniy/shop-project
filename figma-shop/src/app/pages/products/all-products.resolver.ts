import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Observable } from 'rxjs';

@Injectable()

export class AllProductsResolver implements Resolve<any>{
  constructor(private prodService: ProductService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      return this.prodService.getAllProducts().then(data => {
        resolve(data);
      });
    });
  }
}
