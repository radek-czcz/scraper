const test = require('./connection.js');
const urlParser = require('url-parse');
const mysql = require('mysql2');

//test.getArrayOfColumnNamesToString();
//test.test2();
let par =
  urlParser('https://www.mediaexpert.pl/foto-i-kamery/akcesoria-do-aparatow-i-kamer/karty-pamieci/kioxia/pojemnosc-gb_16.32.64?limit=10&sort=price_asc').host

//console.log(par)
  const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'store',
    user:'root',
    password:'asd2%yhfA'
  })

  /*connection.query('select 1', (err, res, f) => {
    console.log(res);
  });*/

/*let queryPromise = new Promise((rej, res) => {*/
/*function query1() {
  return new Promise((reso, rej) => {
    connection.query(`SELECT sellerName FROM store.sprzedawcy
    WHERE sellerWebUrl = 'www.mediaexpert.pl' LIMIT 1`, (err, res, f) => {
    reso(res[0]);
  })*/
/*  connection.query(`SELECT * FROM store.sprzedawcy
  WHERE sellerWebUrl LIKE '%` + par + `%'`, (err, res1, f) => {
  //return res1[0].sellerName;
  //console.log(res1.sellerName);
  res(res1);
})*/
}
)
}

function query1() {

}
query1().then(res => console.log(res))

/*  }
)*/

//queryPromise.then(res => console.log(res))
