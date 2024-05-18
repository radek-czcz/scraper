const ppage = require('./puppLoader.cjs');


async function main() {
   const page = ppage.getPage();
   return page.then(res => {
      return res.evaluate(() => new Promise((resolve) => {
         var scrollTop = -1;
         const interval = setInterval(() => {
            window.scrollBy(0, 300);
            if(document.documentElement.scrollTop !== scrollTop) {
               scrollTop = document.documentElement.scrollTop;
               return;
            }
            clearInterval(interval);
            resolve();
         }, 300);
      }));
   }).then(res => console.log('page scrolled'))
}
module.exports = {main}
