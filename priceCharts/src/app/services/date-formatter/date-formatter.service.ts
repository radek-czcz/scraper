import { formatDateFunction } from './date-formatter1'
import { formatDateFunction2 } from './date-formatter2'
import { Injectable } from '@angular/core';
import { iProduct } from '../../products/iProduct'

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  formatDate(products: iProduct[]): void {
    return formatDateFunction2(products);
  }
}
