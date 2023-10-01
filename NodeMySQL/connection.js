const mysql = require('mysql2');
const dates = require('../dates/date.js')


/*function doConnection() {

  const connection = mysql.createConnection({
    host: '188.210.222.87',
    port:3306,
    database: 'srv59554_mojeprodukty',
    user: 'srv59554_mojeprodukty',
    password: 'XXX',
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

}*/

let connection;

function insert(names, prices, seller) {
    console.log('seller from insert ' + seller)
    let arrayOfData = []
    let query1 = 'INSERT INTO mojeprodukty '
    let dateNow = dates.dateToSqlFormat(new Date());
  //CREATE DB CONNECTION
    connection = mysql.createConnection({
      /*host: '188.210.222.87',
      port:3306,
      database: 'srv59554_mojeprodukty',
      user: 'srv59554_mojeprodukty',
      password: '2!gTaC83GwseD',*/

      
      host:'localhost',
      port:3306,
      database:'store',
      user:'root',
      password:'asd2%yhfA'
      
    })

  //SELLER NAME PARSING FROM DB
    function query3() {
      return new Promise((reso, rej) => {
      connection.query(`SELECT sellerName FROM srv59554_mojeprodukty.sprzedawcy
      WHERE sellerWebUrl = ` + `'` + seller + `'`  + ' LIMIT 1', (err, res, f) => {
      reso(res[0].sellerName);
            })}
      )
    }

      console.log('getting array of columns')

  // GET ARRAY OF COLUMN NAMES FROM DB
    getArrayOfColumnNamesToString()
    .catch(err => {console.log('error by promiseArrayOfColNames' + err)
      return err;
    })

  // CREATE DB'S QUERY TEXT
    .then(res => {
      console.log('array of columns ready ' + res)
      let arrayOfData = [];
      console.log('create querys text')
      let query2 = query1 + res;
      // (prName, prSeller, extractDate) VALUES (?, ?)';
      console.log(query2);

      // TRANSFORM ARRAY OF QUERIED INPUTS AND INSERT INTO DB
      query3().then(resu => {
        for (var nth = 0; nth < names.length; nth++) {
          arrayOfData.push([names[nth], prices[nth], resu, dateNow /*, dateNow*/]);
        }
        console.log(arrayOfData);
        for (var nth = 0; nth < names.length; nth++) {
          console.log(parseFloat(prices[nth]));
          connection.query(query2, [names[nth], prices[nth], resu, dateNow /*, dateNow*/]);
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
  console.log('start columns 1');
  connection.query(query1,
    (err, results, fields) => {
      if (err) {console.log(err)}
      console.log(results);
      queryRes = results;
      resolve();
    })

  }).catch(err => {if (err) {console.log('error by queryForColumnsNames '+ err)}})

  .then(res => {
    let returned = [];
    console.log(queryRes);
    for (let key = 0; key < queryRes.length; key++) {
      returned.push(queryRes[key].Field);
      console.log(queryRes[key].Field);
    }
    //console.log(returned);
    console.log('quer = ' + returned);

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

    resolve(resString);
})

})}

/*function test1(names, prices) {
  console.log('start test1')
  let connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'store',
    user:'root',
    password:'XXX'
  })

let promQuery = new Promise ((resolve, reject) => {
      console.log('prom query')
      connection.query('SHOW COLUMNS FROM mojeprodukty', (err, res, fields) => {
        if (err) return reject(err)
        else resolve(res);
      })
})

  console.log('before end')
  promQuery.then(res => console.log(res))

}*/

/*function testSub() {
  console.log('testSub start')
  let names = [
    'Karta pamięci KIOXIA Exceria microSDXC 64GB',
    'Karta pamięci KIOXIA Exceria SDHC 16GB',
    'Karta pamięci KIOXIA Exceria microSDHC 32GB',
    'Karta pamięci KIOXIA Exceria SDHC 32GB',
    'Karta pamięci KIOXIA Exceria Plus microSDHC 32GB',
    'Karta pamięci KIOXIA Exceria High Endurance microSDHC 32GB',
    'Karta pamięci KIOXIA Exceria microSDHC 16GB'
  ]

  let prices =  [
   '23', '26',
   '29', '34',
   '56', '56',
   '19'
 ]

 return [names, prices]

}

function test2() {
  var arr = testSub();
  test1(arr[0], arr[1])
}*/

module.exports = {insert, getArrayOfColumnNamesToString /*, test2, doConnection*/};
