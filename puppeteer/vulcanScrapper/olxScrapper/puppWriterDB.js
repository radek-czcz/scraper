import { insert } from './connectionToCars.js';

async function main(inp) {
  let {prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate} = inp;
  insert(prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate);
}

export {main};