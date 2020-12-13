import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { FilterData } from '../../interfaces/filter-data.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<ProductInterface>, formData: FilterData): Array<ProductInterface> {
    if (!value) {
      return null;
    }
    return value;
  }
}
