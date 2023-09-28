//import {fakeData} from './fakeData';
import { db } from '../databaseConnection';

export const getAllPricesRoute = {
  method: 'GET',
  path: '/api/all2',
  handler: async (reg, h) => {
    console.log('querying the db');
    const results = await db.query(
      `
      SELECT prName, prPrice, extractDate from mojeprodukty
      WHERE EXISTS (
      select prName from derived1
      where mojeprodukty.prPrice < 1.05*derived1.minP AND
      mojeprodukty.extractDate = DATE("2023-09-28") AND
      derived1.prName = mojeprodukty.prName
      );`
              /* `
              SELECT * from mojeprodukty
              WHERE prPrice > "64.00";
              `*/
      );
    console.log('ending querying');
    return results;
  }
}
