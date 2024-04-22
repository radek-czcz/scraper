const mysql = require('mysql2');
const dates = require('../dates/date.js');

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
      user: 'srv59554_vulcan',
      password: 'uUjAEstAnJEdEXTPbmKW',
    })

    console.log(query1)
    connection.query(query1, [dateNow, timeNow, htmlExams], (err, res, f) => {
      if (err) { console.log(err) }
      // connection.end(() => console.log("mysql connection ended"));
    });    
    connection.query(query2, [dateNow, timeNow, bPlan], (err, res, f) => {
      if (err) { console.log(err) }
    });    
    connection.query(query3, [dateNow, timeNow, hPlan], (err, res, f) => {
      if (err) { console.log(err) }
    });
}

module.exports = { insert };
