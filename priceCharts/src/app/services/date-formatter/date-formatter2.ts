import { DatePipe } from '@angular/common';
import { iProduct } from '../../products/iProduct'

export function formatDateFunction2(products: iProduct[]): void {
    products.forEach(prod => {
        for (let runner in DatePipe) {console.log(runner)}
        //prod.extractDate = DatePipe.transform(prod.extractDate,"yyyy-MM-dd")
    })
  }
