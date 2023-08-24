//import {fakeData} from './fakeData';
import { db } from '../databaseConnection';

export const getAllPricesRoute = {
  method: 'GET',
  path: '/api/all',
  handler: async (reg, h) => {
    const results = await db.query('SELECT * FROM mojeprodukty');
    return results;
  }
}
