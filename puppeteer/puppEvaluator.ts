import {getPages} from './vulcanScrapper/puppLoader'
import {Browser, Page} from 'puppeteer'

let namesAll:string[];
let pricesAll:string[];

async function main(inpPage:Page) {

   let page:Promise<Page[]> = getPages();
   return page.then(async (res:Page[]) => {
      const dataExtract = await /*ppage.getPage()*//*res[0]*/inpPage.evaluate(() => {

         // SELECTORS' STRINGS
            var str:string[] = [
               'div.list-items',
               'div.offer-box',
               'a.is-animate.spark-link',
               'div.main-price.is-big span.whole',
               'div.price-with-code-emblem'
            ]

         // FILTERS STRINGS
            var filterString:string[] = [
               '.icon-box-bold',
               '.offer-unavailable'
            ]

         // ALL PRODUCT FRAMES
            let productBoxes:Element[] = Array.from(document.querySelectorAll(str[0] + ' ' + str[1]))

         // FILTERED (MANUFACTURER) ALL PRODUCT FRAMES
            //.filter(inp => inp.textContent.toLowerCase().includes(filterString[0]))

         // FILTERED (ONLY AVALIBLE TO BUY) ALL PRODUCT FRAMES - falsy expr: !inp.querySelector('.icon-box-bold')
            .filter(inp => !inp.querySelector(filterString[0]))
            .filter(inp => !inp.querySelector(filterString[1]));

         // MAPPED (TO PRODUCTS NAMES UNTRIMMED)
            function select(inp:Element):Element {
               let elem:Element|null = inp.querySelector(str[2]); 
               if (elem) return elem 
               else throw "Empty selector"
            }
            const namesUntrimmed:(Element)[] = productBoxes.map(select);

         // TRIMMED PRODUCT'S NAMES
            function mapToText(element:Element):string {
               let mappedText:string;
               if (element && element.textContent) {
                  mappedText = element.textContent
                  return mappedText.trim()
               } else throw "Empty textContent"
            }

            const names:string[] = namesUntrimmed.map(mapToText);
            namesAll = names;

         // PRICE EXTRACT
            const pricesSelection = productBoxes.map(function(inp) {
               const promoPrice = inp.querySelector(str[4]);
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

         // PRICE PADDING AND NULL-CHECK (PRICE)
            const pricesPadded = pricesSelection.map(function(inp) {
               if (inp === null || inp.textContent === null)
               return "----";
               else return inp.textContent?.replace(/[^0-9^.]/g,'')/*.padStart(4,' ')*/;
            });
            pricesAll = pricesPadded;

         // TRANSFORM OUTPUT ARRAY
            let newOutput = [];
            names.forEach((item, i) => {
               newOutput.push([item, pricesAll[i], dates[i]]);
            });

            // LOG AND RETURN
            console.log([names, pricesPadded, dates]);
            return[names, pricesPadded, dates];

      });

      console.log('ending evaluate')
      namesAll = dataExtract[0];
      console.log('names are: ' + namesAll)
      pricesAll = dataExtract[1];
      console.log('prices are: ' + pricesAll)
      console.log(dataExtract);
      return dataExtract;
   })
}


export {main, namesAll, pricesAll}
