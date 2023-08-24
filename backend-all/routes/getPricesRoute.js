import Boom from '@hapi/boom';
import { db } from '../databaseConnection';

export const getPricesRoute = {
  method: 'GET',
  path: '/api/prices/{id}',
  handler: async (req, h) => {
    //const id = req.params.id;
    const id = req.params.id;
    const results = await db.query(
      `SELECT * FROM mojeprodukty
      WHERE prName=?`,
      [id]
    )
    if (!results) throw Boom.notFound(`Price with an id-name ${id} does not exist`);
    return results;
  }
}
