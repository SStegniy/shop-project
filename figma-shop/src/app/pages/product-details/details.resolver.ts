import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../shared/interfaces/product.interface';
import { ProductServiceService } from '../../shared/services/product-service.service';

@Injectable({
  providedIn: 'root'
})

export class ProdDetailsResolver implements Resolve<ProductInterface>{
  constructor(
    private prodService: ProductServiceService,
    private router: Router) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {​​
    const id = route.params.id;
    return new Promise((resolve, reject) => {
      return this.prodService.getOneProduct(id)
        .then((data: ProductInterface) => resolve(data))
        .catch(error => {
          this.router.navigateByUrl('products');
          resolve(false);
        });
    });
  }

  // I wrote this method for myself to see how it can be implemented using Promise
  public res(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const id = +route.params.id;
    return new Observable((observer) => {
      this.prodService.getOneProduct(id)
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.complete();
          console.log(error);
        });
    });
  }
  // It's just for example
}
