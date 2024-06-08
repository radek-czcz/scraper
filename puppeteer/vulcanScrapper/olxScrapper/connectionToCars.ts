import {dateToSqlFormat, dateToClockTime, CarData} from './index';
import settings from './CarsDBConnectionSettings.js';
import mysql, { Pool, PoolOptions, QueryResult, Query, ResultSetHeader, QueryError, FieldPacket } from 'mysql2'
import {queries} from './QueriesStrings'

let connection:Pool;
let timer

function insert(inp:CarData):Promise<void> {
    // console.log(arguments);
    let promise1:Promise<void>;

  // CREATE DB CONNECTION
    if (!connection) {
      connection = mysql.createPool({
        // debug: true,
        connectionLimit : 2,
        host: '188.210.222.87',
        port:3306,
        database: 'srv59554_cars',
        user: settings.user,
        password: settings.password})
        console.log('getting new connection');
        // console.dir(connection, {depth: 0})
        // console.dir(connection._freeConnections, {depth: 0})
        // queryFunction(connection)
        timer = setTimeout(() => connection.end(() => console.log('connection closed')), 3500)
    }

  // DATA DECONSTRUCTION
    let {prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate} = inp;
    console.log(inp);

  // DATES AND TIME OF INSERTS
    let dateNow0:Date = new Date();
    let dateNow = dateToSqlFormat(dateNow0);
    let timeNow = dateToClockTime(dateNow0);

  // PROMISIFIED QUERY FUNCTION
    function queryFunction():Promise<void> {
        console.log('executing query');
        function promise1() {return new Promise<void>(promiseCallb)}
        function promise2() {return Promise.reject('exams not saved')}

        if (prodYear) {
          return promise1()
        } else {
          console.log('rejecting promise');
          return promise2()
        }
    }

  // Advanced wrapping functions
    let rejectingFunc:Function;

    function promiseCallb(res:(value: void | PromiseLike<void>) => void, rej:(reason?: any) => void):Query {
      // Make query to ask if entry exists - checks if exists entry
      // for a given [prodYear, mileage, city] combination.
        rejectingFunc = rej 
        return connection.query(
          queries.query2Ask, 
          [prodYear, mileage, city.slice(0,25)], 
          (error, results, fields) => {
            // If response comes without error, then check if exists only 1 entry
              if (!error) { goCheckQuery(results) } 
              else {
                console.error(error); rej(error)
              }
            res();
          }
        )
    }

    function goCheckQuery(results:QueryResult) {
      console.log('1st check query executed with success');
      console.log('existing entry: ', Object.values(results)[0])
      console.log('Does exist one entry in DB?: ', Object.values(results).length/*[0]['COUNT(*)']*/ === 1)
      // If exists the entry, then
        // check prices. If prices are equal - update entry with new 'lastSeen' date.
        // If prices are not equal - add new entry in prices table.
      // If there is 0 entries existing, add new entry in prices table.
        if (Object.values(results).length/*[0]['COUNT(*)']*/ === 1) {
            console.log('Are the fetchDates equal: ', Object.values(results)[0]['fetchDate'] == fetchDate);
            console.log("DB's entry fetchDate: ", `'${Object.values(results)[0]['fetchDate']}'`, 'Scrapped fetchDate: ', `'${fetchDate}'`);
            console.log('Price in DB: ', `'${Object.values(results)[0]['price']}', 'Scrapped price: ', '${price}'`);
            console.log('Are the prices equal?: ', Object.values(results)[0]['price'] == price);
          // check if scrapped price equals price in db. If it does it overwrites lastSeen.
          // Otherwise 
            if (Object.values(results)[0]['price'] == price) {console.log('lastSeen in DB: ', Object.values(results)[0]['lastSeen']); if1()}
            else else2();
        } else {
          // Else,
          // add new entry if existing entry's fetchDate is not equal to scrapped fetchDate.
            connection.query(queries.query1, [0, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate], (
              err:QueryError|null,
              res:ResultSetHeader,
              f:FieldPacket[]
            ) => {
              if (err) { console.error(err); console.log(inp); rejectingFunc(err) } else {console.log('Add query to offers executed with success');
                else2();
              }
            });
        }
    }

    function if1() {
      console.log('lastSeen should be overwritten now.');
      connection.query(queries.updateDateQuery, [prodYear, mileage, city, price], (error2:QueryError|null, results2:ResultSetHeader, fields2) => {
        let message:string;
        if (error2) { console.error(error2); console.log(inp); rejectingFunc(error2) } 
        else {
          if (results2.affectedRows === 1 && results2.changedRows === 1) {message = "row has changed"}
            else if (results2.affectedRows === 1 && results2.changedRows === 0) {message = "row has not changed"}
            else message = '';
          console.log('Update query executed with success, ', message);
        }
      })
    }

    function else2() {
      console.log('New entry should be added now.');
      connection.query(queries.query2, [prodYear, mileage, city, fetchDate, price], (error:QueryError|null, results:ResultSetHeader, fields) => {
        if (error) { 
          console.error(error);
          console.log(inp);
          rejectingFunc(error) }
        else {console.log('Add query executed with success')}
      })
    }

  // CATCHER
      return queryFunction().catch(err => {
        if (err.errno === 1062) {
          console.log('duplcate occured - skipped');
          console.dir(err, {depth:0})
          return
        }
        else {
          console.log('not all data has been saved');
          console.dir(err, {depth: 1});
        }
      })
}

export { insert };
