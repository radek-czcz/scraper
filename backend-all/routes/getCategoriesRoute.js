import Boom from '@hapi/boom';
import { db } from '../databaseConnection';

// Used to gain all categories for chips components
  export const getCategoriesRoute = {
    method: 'GET',
    path: '/api/prices/categories',
    handler: async (req, h) => {
      const results = await db.query(
        ` SELECT DISTINCT prCategory from mojeprodukty`
      )
      if (!results) throw Boom.notFound(`Price with an id-name ${id} does not exist`);
      return results;
    }
  }