import {dateToSqlFormat, dateToClockTime, CarData} from './index';
import settings from './CarsDBConnectionSettings.js';
import mysql, { Pool, PoolOptions } from 'mysql2'

let connection:Pool;
let timer

function insert(inp:CarData):Promise<void> {
    // console.log(arguments);
    let promise1:Promise<void>;

  // DATA DECONSTRUCTION
    let {prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate} = inp;
    console.log(inp);

  // DATES AND TIME OF INSERTS
    let dateNow0:Date = new Date();
    let dateNow = dateToSqlFormat(dateNow0);
    let timeNow = dateToClockTime(dateNow0);

  // QUERIES' STRINGS
    let query1 = 
      `INSERT INTO offers (idNum, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // let query2Ask =
    //   `SELECT * FROM offers WHERE
    //   prodYear = ${prodYear} AND
    //   mileage = ${mileage} AND
    //   fetchDate = ${fetchDate}`

      console.log(`'${prodYear.slice(0, 4)}'`, `'${mileage}'`, `'${fetchDate.slice(0, 10)}'`);

    let query2Ask =
      `SELECT COUNT(*) FROM offers WHERE
      'prodYear' = ? AND
      'mileage' = ? AND
      'fetchDate' = ?`

    // let query2Ask =
    //   `SELECT * FROM offers WHERE
    //   prodYear = ? AND
    //   mileage = ? AND
    //   fetchDate = ?`

  // CREATE DB CONNECTION
    if (!connection) {
      connection = mysql.createPool({
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

  // PROMISIFIED QUERY FUNCTIONS
    function queryFunction():Promise<void> {
        console.log('executing query');
        // console.log(prodYear);

        // function promise1() {return new Promise<void>(
        //   (res, rej) => connection.query(query1, [0, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate], (error, results, fields) => {
        //     if (error) { rej(error) } else {console.log('query executed with success');}
        //     res();
        //   })
        // )}

        function promise1() {return new Promise<void>(
          (res, rej) => connection.query(query2Ask, [prodYear.slice(0, 4), mileage, fetchDate.slice(0, 10)], (error, results, fields) => {
            if (error) { console.error(error); rej(error) } else {console.log('query executed with success'); console.log(results);}
            res();
          })
        )}

        function promise2() { return Promise.reject('exams not saved') }

        if (prodYear) {
          return promise1()
        } else {
          console.log('rejecting promise');
          return promise2()
        }
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
