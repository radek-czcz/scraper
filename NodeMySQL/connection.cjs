const mysql = require('mysql2');
const dates = require('../dates/date.cjs');
const category = require('../puppeteer/categories').urlArr[0].category;

let connection;

function insert(names, prices, seller) {
  // let arrayOfData = []
  let query1 = 'INSERT INTO mojeprodukty '
  let dateNow = dates.dateToSqlFormat(new Date());

  // CREATE DB CONNECTION
    connection = mysql.createConnection({
      host: '188.210.222.87',
      port:3306,
      database: 'srv59554_mojeprodukty',
      user: 'srv59554_mojeprodukty',
      password: 'XasR1Mh&dcAq8G',

      /*host:'localhost',
      port:3306,
      database:'store',
      user:'root',
      password:'asd2%yhfA'*/
      
    })

  // SELLER NAME PARSING FROM DB
    function query3() {
      return new Promise((reso, rej) => {
        connection.query(
          /*`SELECT sellerName FROM srv59554_mojeprodukty.sprzedawcy
          WHERE sellerWebUrl = `*/
          `SELECT sellerName FROM sprzedawcy
          WHERE sellerWebUrl = ` + `'` + seller + `'`  + ' LIMIT 1', (err, res, f) => {
            if (err) {console.log('error by parsing seller name')};
            reso(res[0].sellerName);
          }
        )
      })
    }

  // GET ARRAY OF COLUMN NAMES FROM DB
    getArrayOfColumnNamesToString()
    .catch(err => {console.log('error by promiseArrayOfColNames' + err)
      return err;
    })

  // CREATE DB'S QUERY TEXT THEN INSERT
    .then(res => {
      console.log('array of columns ready ' + res)
      // let arrayOfData = [];
      console.log('create querys text')
      let query2 = query1 + res;
      // (prName, prSeller, extractDate) VALUES (?, ?)';
      console.log(query2);

    // TRANSFORM ARRAY OF QUERIED INPUTS AND INSERT INTO DB
      query3().then(resu => {
        for (var nth = 0; nth < names.length; nth++) {
          // arrayOfData.push([names[nth], prices[nth], resu, dateNow /*, dateNow*/]);
        }
        // console.log(arrayOfData);
        for (var nth = 0; nth < names.length; nth++) {
          // console.log(parseFloat(prices[nth]));
          connection.query(query2, 
            [names[nth], prices[nth], resu, category/*"Pendrive"*/, ,  dateNow],
            (err, res, fields) => {
              if (err) {console.log('error by insert');
                switch (err.code) {
                  case 'ER_DUP_ENTRY': {
                    console.log('attempt to insert duplicate entry has been blocked: ', err.sqlMessage)
                  }
                }
                // console.dir(err, {depth:1});
              };
              if (res) {
                console.dir('inserted:');
                console.dir('    ', names[nth]);
              }
              connection.end(() => console.log('connection ended'));
            } 
          );
        }
      })
    })
}

function getArrayOfColumnNamesToString(inpName = 'mojeprodukty') {

  return new Promise((reject, resolve) => {

    let resString = '(';

    /*let connection = mysql.createConnection({
    
      host:'localhost',
      port:3306,
      database:'store',
      user:'root',
      password:'XXX'
    
      host: '188.210.222.87',
      port:3306,
      database: 'srv59554_mojeprodukty',
      user: 'srv59554_mojeprodukty',
      password: 'XXX',
    })*/

    console.log('start columns');
    const query1 =   'SHOW COLUMNS FROM ' + inpName;
    let queryRes;

    let queryForColumnsNames = new Promise((reject, resolve) => {
      connection.query(query1,
        (err, results, fields) => {
          if (err) {console.log(err)}
          // console.log(results);
          queryRes = results;
          resolve();
        })
    })
    .catch(err => {if (err) {console.log('error by queryForColumnsNames '+ err)}})
    .then(res => {
      let returned = [];
      // console.log(queryRes);
      for (let key = 0; key < queryRes.length; key++) {
        returned.push(queryRes[key].Field);
        console.log(queryRes[key].Field);
      }
      // console.log('quer = ' + returned);
      resString = '(' + returned[0];
      for (let nth=1; nth<returned.length; nth++ ) {
        resString = resString + ', ' + returned[nth];
      }
      resString = resString + ') VALUES (?';
      for (nth=1; nth < returned.length; nth++) {
        resString = resString + ', ?';
      }
      resString = resString+')';
      // console.log ('resString = ' + resString);
      resolve(resString);
    })
  })
}

module.exports = { insert, getArrayOfColumnNamesToString };
