const mysql = require('mysql2');
const dates = require('../dates/date.js');

let connection;

function insert(html) {
  
  console.log('length of html string: ', html.length)
  let dateNow0 = new Date();
  let dateNow = dates.dateToSqlFormat(dateNow0);
  let timeNow = dates.dateToClockTime(dateNow0);
  let query1 = 
    `INSERT INTO exams (date, time, htmlElement)
    VALUES (?, ?, ?)`

  // CREATE DB CONNECTION
    connection = mysql.createConnection({
    })

    console.log(query1)
    connection.query(query1, [dateNow, timeNow, html], (err, res, f) => {
      if (err) { console.log(err) }
    });
}

module.exports = { insert };
