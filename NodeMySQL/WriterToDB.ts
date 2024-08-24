import {dateToSqlFormat} from '../dates/date';
import {urlArr} from '../puppeteer/ConfigFiles/categories';
import getArrayOfColumnNamesToString from './DbReader/ColumnsReader';
import connection from './Connection/connection2';
import {Connection, RowDataPacket, FieldPacket, QueryError} from 'mysql2/promise';
import getSeller from './DbReader/SellerReader';

export default function insert(names:string[], prices:string[], seller:string):void {

  let query1:string = 'INSERT INTO mojeprodukty '
  let dateNow:string = dateToSqlFormat(new Date());

  // GET ARRAY OF COLUMN NAMES FROM DB
    getArrayOfColumnNamesToString()
    .catch(err => {console.log(`error by column names from DB \n` + err)
      return err;
    })

  // CREATE DB'S QUERY TEXT THEN INSERT
    .then((res:string) => {
      let query2:string = query1 + res;

      // TRANSFORM ARRAY OF QUERIED INPUTS AND INSERT INTO DB
        getSeller().then((seller1:string) => {
          for (let nth:number = 0; nth < names.length; nth++) {
            connection.then((conn:Connection) => {
              return conn.query(query2, 
                [names[nth], prices[nth], seller1, urlArr[0].category,, dateNow],
            )})
            .then(
              () => console.log('inserted: ', names[nth]),
              (err:QueryError) => console.log(`error occured, "${names[nth].toUpperCase()}" not inserted`+`\n`+err)
            );
          }
        })
    })
}

export { getArrayOfColumnNamesToString };
