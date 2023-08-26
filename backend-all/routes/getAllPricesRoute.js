//import {fakeData} from './fakeData';
import { db } from '../databaseConnection';

export const getAllPricesRoute = {
  method: 'GET',
  path: '/api/all',
  handler: async (reg, h) => {
    const results = await db.query(

      `

    	SELECT prName, prPrice, extractDate from mojeprodukty
    	WHERE EXISTS (
    		select prName from store.derived1
    		where mojeprodukty.prPrice < 1.0*derived1.minP AND
    		mojeprodukty.extractDate = DATE(NOW()) AND
    		derived1.prName = mojeprodukty.prName
    	);`

    );
    return results;
  }
}
