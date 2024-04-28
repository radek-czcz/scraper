import mysql from 'mysql2';
import * as dates from '../dates/date.js';
import credentials from './VulcanDBConnectionSettings.js';

let connection;

function insert(htmlExams, hPlan, bPlan) {
  
  // console.log('length of html string: ', html.length)
  let dateNow0 = new Date();
  let dateNow = dates.dateToSqlFormat(dateNow0);
  let timeNow = dates.dateToClockTime(dateNow0);
  let query1 = 
    `INSERT INTO exams (date, time, htmlElement)
    VALUES (?, ?, ?)`;
  let query2 = 
    `INSERT INTO bPlan (date, time, htmlElement)
    VALUES (?, ?, ?)`;
  let query3 = 
    `INSERT INTO hPlan (date, time, htmlElement)
    VALUES (?, ?, ?)`;

  // CREATE DB CONNECTION
    connection = mysql.createPool({
      connectionLimit : 3,
      host: '188.210.222.87',
      port:3306,
      database: 'srv59554_vulcan',
      user: credentials.user,
      password: credentials.password
    })

    let promise1 = () => new Promise((res, rej) => connection.query(query1, [dateNow, timeNow, htmlExams], (err, result, f) => {
      if (err) { console.log(err); rej() }
      res();
    }));
    let promise2 = () => new Promise((res, rej) => connection.query(query2, [dateNow, timeNow, bPlan], (err, result, f) => {
      if (err) { console.log(err); rej() }
      res();
    }));    
    let promise3 = () => new Promise((res, rej) => connection.query(query3, [dateNow, timeNow, hPlan], (err, result, f) => {
      if (err) { console.log(err); rej() }
      res();
    }));
    Promise.all([promise1(), promise2(), promise3()]).then(() => connection.end((err) => {!err ? console.log('mysql connection ended'): console.log('error by closing mysql connection')}))
}

export { insert };
