const pLoader = require('./puppLoader.js');



async function main() {
   const page = pLoader.getPu().then(res => {
      console.log(res);
      return res.pages()
   })
   .catch(err => console.log(err));

   page.then(res => {
      console.log(res);
      return res[1];
   })
   .then(res => {
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

main();

module.exports = {main}
