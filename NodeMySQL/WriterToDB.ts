import {dateToSqlFormat} from '../dates/date.cjs';
import {urlArr} from '../puppeteer/ConfigFiles/categories';
import getArrayOfColumnNamesToString from './DbReader/ColumnsReader';
import connection from './Connection/connection2';
import {Connection} from 'mysql2/promise';

export default function insert(names:string[], prices:string[], seller:string):void {
  // let arrayOfData = []
  let query1:string = 'INSERT INTO mojeprodukty '
  let dateNow = dateToSqlFormat(new Date());

  // SELLER NAME PARSING FROM DB
    function query3() {
      return new Promise((reso, rej) => {
        connection.then((conn:Connection) => conn.query(
          /*`SELECT sellerName FROM srv59554_mojeprodukty.sprzedawcy
          WHERE sellerWebUrl = `*/
          `SELECT sellerName FROM sprzedawcy
          WHERE sellerWebUrl = ` + `'` + seller + `'`  + ' LIMIT 1'/*, (err:Error, res, f) => {
            if (err) {console.log('error by parsing seller name')};
            reso(res[0].sellerName);
          }*/
        ))
      })
    }

  // GET ARRAY OF COLUMN NAMES FROM DB
    getArrayOfColumnNamesToString()
    .catch(err => {console.log('error by promiseArrayOfColNames' + err)
      return err;
    })

  // CREATE DB'S QUERY TEXT THEN INSERT
    .then(res => {
      console.log('array of columns ready ' + res)
      // let arrayOfData = [];
      console.log('create querys text')
      let query2 = query1 + res;
      // (prName, prSeller, extractDate) VALUES (?, ?)';
      console.log(query2);

    // TRANSFORM ARRAY OF QUERIED INPUTS AND INSERT INTO DB
      query3().then(resu => {
        for (var nth = 0; nth < names.length; nth++) {
          // arrayOfData.push([names[nth], prices[nth], resu, dateNow /*, dateNow*/]);
        }
        // console.log(arrayOfData);
        for (var nth = 0; nth < names.length; nth++) {
          // console.log(parseFloat(prices[nth]));
          connection.query(query2, 
            [names[nth], prices[nth], resu, urlArr[0].category/*"Pendrive"*/, ,  dateNow],
            (err, res, fields) => {
              if (err) {console.log('error by insert');
                switch (err.code) {
                  case 'ER_DUP_ENTRY': {
                    console.log('attempt to insert duplicate entry has been blocked: ', err.sqlMessage)
                  }
                }
                // console.dir(err, {depth:1});
              };
              if (res) {
                console.dir('inserted:');
                console.dir('    ', names[nth]);
              }
              connection.end(() => console.log('connection ended'));
            } 
          );
        }
      })
    })
}

export { getArrayOfColumnNamesToString };
