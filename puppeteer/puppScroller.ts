import {Browser, Page} from 'puppeteer'

async function main(page:Page):Promise<void> {
   return page.evaluate(() => new Promise<void>((resolve) => {
      var scrollTop:number = -1;
      const interval = setInterval(() => {
         window.scrollBy(0, 300);
         if(document.documentElement.scrollTop !== scrollTop) {
            scrollTop = document.documentElement.scrollTop;
            return;
         }
         clearInterval(interval);
         console.log('Scrolling finished');
         resolve();
      }, 300);
   }))
}

export default main
