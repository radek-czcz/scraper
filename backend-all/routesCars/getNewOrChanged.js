import Boom from '@hapi/boom';
import { db } from '../databaseConnectionCars';
import queryStr from './queryString'

export const getOffers = {
  method: 'GET',
  path: '/newOffers',
  handler: async (req, h) => {
    //const id = req.params.id;
    console.log('access');
    const id = req.params.id;
    const results = await db.query(queryStr)
    if (!results) throw Boom.notFound(`Price with an id-name ${id} does not exist`);
    return results;
  }
}