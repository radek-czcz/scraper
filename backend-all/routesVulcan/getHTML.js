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

  export const getbPlan = {
    method: 'GET',
    path: '/bPlan',
    handler: async (reg, h) => {
      const results = await db.query(
        `SELECT * FROM bPlan`
      )
      console.log(results.length);
      if (!results) throw Boom.notFound(`Error in getting plan`);
      return results;
    }
  }

  export const gethPlan = {
    method: 'GET',
    path: '/hPlan',
    handler: async (reg, h) => {
      const results = await db.query(
        `SELECT * FROM hPlan`
      )
      console.log(results.length);
      if (!results) throw Boom.notFound(`Error in getting plan`);
      return results;
    }
  }