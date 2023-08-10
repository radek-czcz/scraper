//import {doConnection} from '../NodeMySQL/connection.js'
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
//import {doConnection} from '../NodeMySQL/connection.js'
const conn = require('./NodeMySQL/connection.js')
//const scrap1 = require('./meczajniki');
const pLoader = require('./puppeteer/puppLoader.js');
const pScroller = require('./puppeteer/puppScroller.js')
const pEvaluator = require('./puppeteer/puppEvaluator.js')
const pWriter = require('./puppeteer/puppWriterDB.js')

async function do_() {
  const puppeteerIns = pLoader.loadPuppeteer(false);
  url = 'https://www.mediaexpert.pl/foto-i-kamery/akcesoria-do-aparatow-i-kamer/karty-pamieci/kioxia/pojemnosc-gb_16.32.64?limit=10&sort=price_asc';
  //pLoader.loadPage(url);
  console.log(puppeteerIns);
  let arr;

  puppeteerIns.then(res => pLoader.loadPage(url))
  .then(res => pScroller.main())
  .then(res => pEvaluator.main())
  .then(res => console.log(res));
  //.then(res => pWriter.main(res[0],res[1]))
  /*.then(res => {
    console.log(arr[0]);
    pWriter.main(arr[0], arr[1])
  })*/
}

do_();
