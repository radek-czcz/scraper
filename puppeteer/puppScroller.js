const ppage = require('./puppLoader.js');


async function main() {
   const page = ppage.getPage();
   page.then(res => {
      res.evaluate(() => new Promise((resolve) => {
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
