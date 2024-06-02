import {dateToSqlFormat, dateToClockTime, CarData} from './index';
import settings from './CarsDBConnectionSettings.js';
import mysql, { Pool, PoolOptions, QueryResult, Query } from 'mysql2'

let connection:Pool;
let timer

// QUERIES' STRINGS
  let query1:string = 
    `INSERT INTO offers (idNum, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // let query2Ask =
  //   `SELECT * FROM offers WHERE
  //   prodYear = ${prodYear} AND
  //   mileage = ${mileage} AND
  //   fetchDate = ${fetchDate}`

  // let query2Ask:string =
  //   `SELECT * FROM offers WHERE
  //   prodYear = ? AND
  //   mileage = ? AND
  //   city = ?`

  let query2Ask:string =
    `SELECT * FROM offers WHERE
    prodYear = ? AND
    mileage = ? AND
    city = ?
    ORDER BY lastSeen
    LIMIT 1`

  // let query2Ask:string =
  //   `SELECT * FROM offers WHERE
  //   prodYear = ? AND
  //   mileage = ? AND
  //   fetchDate = ?`

  let updateDateQuery:string = `UPDATE offers
    SET lastSeen = CURDATE()
    WHERE 
      prodYear = ? AND
      mileage = ? AND
      city = ? AND
      price = ?`

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

        // function promise1() {return new Promise<void>(
          //   (res, rej) => connection.query(query1, [0, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate], (error, results, fields) => {
          //     if (error) { rej(error) } else {console.log('query executed with success');}
          //     res();
          //   })
          // )}

          // function promise1() {return new Promise<void>(
          //   (res, rej) => connection.query(query2Ask, [prodYear, mileage, city, price], (error, results, fields) => {
          //     let queryRes:QueryResult;
          //     if (error) { console.error(error); rej(error) } 
          //     else {
          //       queryRes = results;
          //       console.log('1st check query executed with success');
          //       // console.log(Object.values(queryRes)[0]['COUNT(*)'] === 1);
          //       if (Object.values(queryRes)[0]['COUNT(*)'] === 1) {
          //         connection.query(updateDateQuery, [prodYear, mileage, city, price], (error2, results2, fields2) => {
          //           let queryRes2:QueryResult;
          //           if (error2) { console.error(error2); rej(error2) } 
          //           else {
          //             queryRes2 = results2;
          //             console.log('Update query executed with success\n', results2);
          //           }
          //         })
          //       } else {
          //         connection.query(query1, [0, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate], (error, results, fields) => {
          //           if (error) { rej(error) } else {console.log('Add query executed with success');}
          //         })
          //       }
          //     }
          //     res();
          //   })
          // )}

        function promise2() { return Promise.reject('exams not saved') }

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
      // for a given [prodYear, mileage, city, price] combination.
        rejectingFunc = rej 
        return connection.query(
          query2Ask, 
          [prodYear, mileage, city], 
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
      // console.log(Object.values(results)[0])
      // console.log(`exists ${Object.values(results)[0]['COUNT(*)']} entries`);
      if (Object.values(results).length/*[0]['COUNT(*)']*/ === 1) {
        // If only 1 exists, then
        // update entry with new 'lastSeen' date
          console.log(`'${Object.values(results)[0]['price']}', '${price}'`);
          if (Object.values(results)[0]['price'] == price) if1()
          else else2();
      } else {
        // Else,
        // add new entry
          else2();
      }
    }

    function if1() {
      connection.query(updateDateQuery, [prodYear, mileage, city, price], (error2, results2, fields2) => {
        if (error2) { console.error(error2); rejectingFunc(error2) } 
        else {
          console.log('Update query executed with success\n', results2);
        }
      })
    }

    function else2() {
      connection.query(query1, [0, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate], (error, results, fields) => {
        if (error) { console.log(error); rejectingFunc(error) } else {console.log('Add query executed with success');}
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
