import mysql from 'mysql2';
import {dateToSqlFormat, dateToClockTime} from './index.mjs';
import settings from './CarsDBConnectionSettings.js';

let connection;
let timer

function insert(prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate) {
    // console.log(arguments);
    let promise1;

  // DATES AND TIME OF INSERTS
    let dateNow0 = new Date();
    let dateNow = dateToSqlFormat(dateNow0);
    let timeNow = dateToClockTime(dateNow0);

  // QUERIES' STRINGS
    let query1 = 
      `INSERT INTO offers (idNum, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;



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
    function queryFunction() {
        console.log('executing query');
        if (prodYear) {
        promise1 = () => new Promise(
          (res, rej) => connection.query(query1, [0, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate], (error, results, fields) => {
            if (error) { console.log(error); rej('error by query') } else {console.log('query executed with success');}
            res();
          })
        )} else {
          promise1 = () => Promise.reject('exams not saved')
        }
    }

    queryFunction()

    promise1().catch(err => {console.log('not all data has been saved'); console.dir(err, {depth: 1})})
}




export { insert };
