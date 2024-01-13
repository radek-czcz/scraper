import { db } from '../databaseConnection';

// route definition
  export const getAllPricesRoute = {
    method: 'GET',
    path: '/api/all2',
    handler: async (reg, h) => {
      console.dir(await reg.query['catg'])
      console.log('querying the db');

      let sqlInClause = '';
      let filter = reg.query['price'] ? reg.query['price'] : 1.0;
      let category = reg.query['catg'] ? reg.query['catg'] : null;

      let arrayOfFilters;

      if (category !== 'undefined' && category !== null) {
        console.log("reg.query['catg'] positive", reg.query['catg'])
        arrayOfFilters = reg.query['catg'].split(',');
        arrayOfFilters.forEach((inp, nth) => {
        inp = `'` + inp;
        inp += `'`;
        nth < arrayOfFilters.length - 1 ? inp += `,` : null;
        // console.log(reg.query[attr]);
        sqlInClause += inp;
      })

      } else {
        console.log("reg.query['catg'] negative")
      }



      sqlInClause !== '' ? sqlInClause = 'AND mojeprodukty.prCategory IN (' + sqlInClause + ')' : null;


      

      /*let maxDate = await db.query('SELECT MAX(extractDate) from mojeprodukty');
      console.log(maxDate[0]['MAX(extractDate)'].toString());
      maxDate = new Date(Date.parse(maxDate[0]['MAX(extractDate)'] + ' ' + 'GMT'));
      console.log('maxDate: ', maxDate);
      maxDate = maxDate.toISOString().split('T')[0];
      maxDate = "'" + maxDate + "'";
      console.log('maxDate: ', maxDate);*/
      let maxDate = dateFormat();
      let queryString =     
        `SELECT prName, prPrice, extractDate from mojeprodukty
        WHERE EXISTS (
        select prName from derived1
        where mojeprodukty.prPrice < ${filter}*derived1.minP AND
        mojeprodukty.extractDate = DATE(${await maxDate}) AND
        derived1.prName = mojeprodukty.prName
        ${sqlInClause});`

      console.log(queryString);

      const results = await db.query(queryString);
      console.log('ending querying');
      return results;
    }
  }

async function dateFormat() {
  let maxDate = await db.query('SELECT MAX(extractDate) from mojeprodukty');
  console.log(maxDate[0]['MAX(extractDate)'].toString());
  maxDate = new Date(Date.parse(maxDate[0]['MAX(extractDate)'] + ' ' + 'GMT'));
  console.log('maxDate: ', maxDate);
  maxDate = maxDate.toISOString().split('T')[0];
  maxDate = "'" + maxDate + "'";
  console.log('maxDate: ', maxDate);
  return maxDate;
}