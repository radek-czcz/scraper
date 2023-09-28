//import {doConnection} from '../NodeMySQL/connection.js'
const fs = require('fs');
const urlParser = require('url-parse');
const puppeteer = require('puppeteer-extra');
//import {doConnection} from '../NodeMySQL/connection.js'
const conn = require('./NodeMySQL/connection.js')
//const scrap1 = require('./meczajniki');
const pLoader = require('./puppeteer/puppLoader.js');
const pScroller = require('./puppeteer/puppScroller.js')
const pEvaluator = require('./puppeteer/puppEvaluator.js')
const pWriter = require('./puppeteer/puppWriterDB.js')

let url = ['https://www.mediaexpert.pl/foto-i-kamery/akcesoria-do-aparatow-i-kamer/karty-pamieci/kioxia/pojemnosc-gb_16.32.64?limit=10&sort=price_asc']
url.push('https://www.mediaexpert.pl/agd/lodowki-i-zamrazarki/chlodziarki/whirlpool.electrolux/cena_1200.0?sort=price_asc&limit=50');
url.push('https://www.mediaexpert.pl/agd/zmywarki-i-akcesoria/zmywarki-60-cm/whirlpool.bosch.samsung.electrolux/pojemnosc-kpl_od-13-do-14/poziom-emisji-halasu-db_od-46-do-47.od-44-do-45.do-43/zuzycie-wody-na-cykl-w-programie-eko-l_do-9.od-9-1-do-11/cena_1000.0?limit=50&sort=price_asc')
url.push('https://www.mediaexpert.pl/komputery-i-tablety/klawiatury-komputerowe/klawiatury/logitech.microsoft.hp.samsung.dell.asus/komunikacja-z-komputerem_bezprzewodowa?sort=price_asc');

async function do_(urlInp) {
  const puppeteerIns = pLoader.loadPuppeteer(false);
  //pLoader.loadPage(url);
  console.log(puppeteerIns);
  let arr;
  let strUrlPased = urlParser(urlInp).host

  puppeteerIns.then(res => pLoader.loadPage(urlInp))
  .then(res => pScroller.main())
  .then(res => pEvaluator.main())
  //.then(res => console.log(res));
  .then(res => {
      console.log('seller from main ' + strUrlPased)
    pWriter.main(res[0],res[1], strUrlPased)})
  /*.then(res => {
    console.log(arr[0]);
    pWriter.main(arr[0], arr[1])
  })*/
}

//url.forEach(inp => do_(inp);
do_(url[1]);
