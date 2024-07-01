import {getPages} from './vulcanScrapper/puppLoader'
import {Browser, Page} from 'puppeteer'

let namesAll:string[];

async function main(inpPage:Page) {

      const dataExtract = await inpPage.evaluate(() => {

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
            // function select(inp:Element):Element {
            //    let elem:Element|null = inp.querySelector(str[2]); 
            //    if (elem) return elem 
            //    else throw "Empty selector"
            // }
            function select(inp:Element):Element {
               let elem:Element|null = inp.querySelector(str[2]); 
               return elem!
            }
            const namesUntrimmed:(Element)[] = productBoxes.map(select);

         // TRIMMED PRODUCT'S NAMES
            // function mapToText(element:Element):string {
            //    let mappedText:string;
            //    if (element && element.textContent) {
            //       mappedText = element.textContent
            //       return mappedText.trim()
            //    } else throw "Empty textContent"
            // }
            function mapToText(element:Element):string {
               let mappedText:string;
                  mappedText = element!.textContent!
                  return mappedText.trim()
            }

            const names:string[] = namesUntrimmed.map(mapToText);
            namesAll = names;

         // PRICE EXTRACT
            // const pricesSelection:Element[] = productBoxes.map(function(inp:Element) {
            //    const promoPrice:Element|null = inp.querySelector(str[4]);
            //    // CHECK IF PROMO-PRICE
            //    if (promoPrice) {
            //       return promoPrice.querySelector('span.whole');
            //    } else {
            //       let select1:Element|null = inp.querySelector(str[3]);
            //       if (select1) return select1
            //       else throw "Price not found"
            //    }
            // });
            const pricesSelection:Element[] = productBoxes.map(function(inp:Element) {
               const promoPrice:Element|null = inp.querySelector(str[4]);
               // CHECK IF PROMO-PRICE
               if (promoPrice) {
                  return promoPrice.querySelector('span.whole')!;
               } else {
                  let select1:Element = inp.querySelector(str[3])!;
                  return select1;
               }
            });

         // GET DATE OF EXTRACT, CREATE ARRAY OF DATES
            let date:Date = new Date();
            let dates:string[] = Array(pricesSelection.length).fill(date);

         // PRICE PADDING AND NULL-CHECK (PRICE)
            const pricesPadded:string[] = pricesSelection.map(function(inp:Element) {
               if (inp === null || inp.textContent === null)
               return "----";
               else return inp.textContent.replace(/[^0-9^.]/g,'')/*.padStart(4,' ')*/;
            });

         // LOG AND RETURN
            console.log([names, pricesPadded, dates]);
            return[names, pricesPadded, dates];
      });

      console.log('ending evaluate')
      console.log(dataExtract);
      return dataExtract;
}


export {main}
