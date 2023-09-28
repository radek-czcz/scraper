
import { iProduct } from '../../products/iProduct'

export function formatDateFunction(products: iProduct[]): void {
    products.forEach(prod => {
        console.log(prod);
        let date = prod.extractDate;
        let splitted = date.split(/[- : T]/);
        console.log(splitted);
        let dateMidForm =  new Date(Date.UTC(+splitted[0], +splitted[1]-1, +splitted[2]));
        console.log(dateMidForm);
        let dateFormatted = dateMidForm.getFullYear().toString()+'-'+(dateMidForm.getMonth()+1) +'-'+ ((+dateMidForm.getDate()+1).toString());
        console.log(dateFormatted);
        prod.extractDate = dateFormatted;
        console.log(prod);
      })
    }
