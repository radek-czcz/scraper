const mysql = require('mysql2');
const dates = require('../dates/date.js')


function doConnection() {

  const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'store',
    user:'root',
    password:'asd2%yhfA'
  })

  var dbConnStatus = '';

  connection.connect((error) => {
    if (error) {
      dbConnStatus = '<h3 class="error"> MySQL Database connection error</h3>'
      console.log(result);
    } else {
      dbConnStatus = '<h3 class="error"> MySQL Database connection success</h3>'
      console.log("success");
    }
  });

  connection.query('SELECT * FROM customers', (err, res, fields) => {
    if (err) {
      console.log(err)
    } else (
      console.log(res)
    )
  });

  connection.query('SELECT * FROM products', (err, res, fields) => {
    if (err) {
      console.log(err)
    } else (
      console.log(res)
    )
  });

}

function insert(names, prices) {

  const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'store',
    user:'root',
    password:'asd2%yhfA'
  })

   const query1 = 'INSERT INTO mojeprodukty ' + getArrayOfColumnNamesToString('mojeprodukty');
   // (prName, prSeller, extractDate) VALUES (?, ?)';

   let dateNow = dates.dateToSqlFormat(new Date());

   for (var nth = 0; nth < names.length; nth++) {
     connection.query(query1, [names[nth], 'Media Expert', 22312234, dateNow]);
    }
}

function getArrayOfColumnNamesToString(inpName = 'mojeprodukty') {

  let resString = '(';

  const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'store',
    user:'root',
    password:'asd2%yhfA'
  })

  'SHOW COLUMNS FROM sale_details';
  const query1 =   'SHOW COLUMNS FROM ' + inpName;
  let quer = connection.query(query1,
    function (err, results, fields) {
      let returned = [];
      console.log(results);
      for (var key of results) {
        returned.push(key.Field);
        console.log(key.Field);
      }
      //console.log(returned);
      console.log('quer = ' + quer);

      resString = '(' + returned[0]

      for (let nth=1; nth<returned.length; nth++ ) {
        resString = resString + ', ' + returned[nth]
      }

      resString = resString + ') VALUES (?'
      for (nth=1; nth < returned.length; nth++) {
        resString = resString + ', ?'
      }

      resString = resString+')';
      console.log ('resString = ' + resString);
    })
}


module.exports = {doConnection, insert};
