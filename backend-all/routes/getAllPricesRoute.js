//import {fakeData} from './fakeData';
import { db } from '../databaseConnection';

export const getAllPricesRoute = {
  method: 'GET',
  path: '/api/all2',
  handler: async (reg, h) => {
    const results = await db.query(

      `
      SELECT prName, prPrice, extractDate from mojeprodukty
      WHERE EXISTS (
        select prName from derived1
        where mojeprodukty.prPrice < 1.1*derived1.minP AND
        mojeprodukty.extractDate = DATE("2023-08-29") AND
        derived1.prName = mojeprodukty.prName
      );`

      /*`
      SELECT * from mojeprodukty;`*/

    );
    return results;
  }
}

//DATE(NOW())
