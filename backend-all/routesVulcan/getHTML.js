import { db } from '../databaseConnectionVulcan';

  export const getHTML = {
    method: 'GET',
    path: '/sprawdziany',
    handler: async (reg, h) => {
      const results = await db.query(
        `SELECT * FROM exams`
      )
      console.log(results.length);
      if (!results) throw Boom.notFound(`Error in getting plan`);
      return results;
    }
  }