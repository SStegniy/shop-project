import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: ProductInterface[], sort: string): ProductInterface[] {
    if (!value) {
      return null;
    }
    if (sort === 'Default') {
      return value;
    }
    if (sort === 'price Large - Small') {
      return value.sort((a, b) => b.price - a.price);
    }
    if (sort === 'price Small - Large') {
      return value.sort((a, b) => a.price - b.price);
    }
    if (sort === 'rating Large - Small') {
      return value.sort((a, b) => b.rating - a.rating);
    }
    if (sort === 'rating Small - Large') {
      return value.sort((a, b) => a.rating - b.rating);
    }
  }

}
