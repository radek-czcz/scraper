const ppage = require('./puppLoader.js');

let namesAll;
let pricesAll;


function getNames() {
  return namesAll;
}

function getPrices() {
  return pricesAll;
}

async function main() {
  const dataExtract = await ppage.getPage().evaluate(() => {

  // SELECTORS' STRINGS
     var str = [
     'div.list-items',
     'div.offer-box',
     'a.is-animate.spark-link',
     'div.main-price.is-big span.whole'
     ]

  //FILTERS' STRINGS
     var filterString = [
        '.icon-box-bold'
     ]


  // ALL PRODUCT FRAMES
     productBoxes = Array.from(document.querySelectorAll(str[0] + ' ' + str[1]))
  // FILTERED (MANUFACTURER) ALL PRODUCT FRAMES
        //.filter(inp => inp.textContent.toLowerCase().includes(filterString[0]))
  // FILTERED (ONLY AVALIBLE TO BUY) ALL PRODUCT FRAMES - falsy expr: !inp.querySelector('.icon-box-bold')
        .filter(inp => !inp.querySelector(filterString[0]));
  // MAPPED (TO PRODUCTS NAMES UNTRIMMED)
     const namesUntrimmed = productBoxes.map(inp => inp.querySelector(str[2]));
  // UNTRIMMED PRODUCT'S NAMES
     const names = namesUntrimmed.map(inp => inp.textContent.trim());
     namesAll = names;
  //PRICE EXTRACT
     const pricesSelection = productBoxes.map(function(inp) {
        const promoPrice = inp.querySelector('div.price-with-code-emblem');
        // CHECK IF PROMO-PRICE
        if (promoPrice) {
           return promoPrice.querySelector('span.whole');
        } else {
           return inp.querySelector(str[3]);
        }
     });

     // GET DATE OF EXTRACT, CREATE ARRAY OF DATES
     let date = new Date();
     let dates = Array(pricesSelection.length).fill(date);

  //PRICE PADDING AND NULL-CHECK (PRICE)
     const pricesPadded = pricesSelection.map(function(inp) {
        if (inp === null)
           return "----";
        else
           return inp.textContent/*.padStart(4,' ')*/;
     });
     pricesAll = pricesPadded;

     //TRANSFORM OUTPUT ARRAY
     let newOutput = [];
     names.forEach((item, i) => {
       newOutput.push([item, pricesAll[i], dates[i]]);
     });

     //console.log([names, pricesPadded, dates]);
    //console.log(newOutput);
    console.log('array evaluated');
    console.log([names, pricesPadded, dates]);
    return[names, pricesPadded, dates];

  });
  console.log('ending evaluate')
  namesAll = dataExtract[0];
  //console.log('names are: ' + namesAll)
  pricesAll = dataExtract[1];
  //console.log('prices are: ' + pricesAll)

  return dataExtract;
}


module.exports = {main, namesAll, pricesAll}
