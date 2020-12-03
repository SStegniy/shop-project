import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductServiceService } from '../../shared/services/product-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AllProductsResolver implements Resolve<any>{
  constructor(private prodService: ProductServiceService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      return this.prodService.getAllProducts().then(data => {
        resolve(data);
      });
    });
  }
}
