// import {dateToSqlFormat} from '../dates/date.cjs';
// import {urlArr} from '../puppeteer/ConfigFiles/categories';
// import getArrayOfColumnNamesToString from './DbReader/ColumnsReader';
import connection, {closeConnection} from './Connection/connection2';
import {Connection, FieldPacket, RowDataPacket, Query} from 'mysql2/promise';

let result:Promise<[RowDataPacket[], FieldPacket[]]> = connection.then((conn:Connection) => conn.query(
          `SELECT prName, prSeller FROM mojeprodukty
          LIMIT 2`
        ))

result.then((res:[RowDataPacket[], FieldPacket[]]) => console.log(res[0][0]['prName']))

// result.then(() => connection.then(() => closeConnection()))