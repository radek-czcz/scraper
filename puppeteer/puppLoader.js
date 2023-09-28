const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

let pu;
let pa;
let exBr;

puppeteer.use(StealthPlugin());

function loadPuppeteer(headless) {
  return puppeteer.launch({
      headless: headless,
      args: ['--no-sandbox', '--incognito'],
      /*devtools: false,*/
      slowMo:300
      //args: ['--no-sandbox', '--incognito']
  })
  .then(res => {
    console.dir(res, {depth: 0})
    pu = res;
    return res;
  })
  //return inst.then(res => res)
  //return inst;
}

function getExistingBrowser() {
  return puppeteer.connect(
      {browserWSEndpoint: 'ws://127.0.0.1:65048/devtools/browser/ddd8c69e-41f1-4793-8e5c-f982c3c86225'}
  ).then(res => {
    console.dir(res, {depth: 0});
    exBr = res;
    return res;
  });
}

function getExistingPage() {
  return exBr.pages().then(res => res[1])
}

async function loadPage(url) {
  const page = await pu.newPage();
  await page.goto(url, {
   waitUntil: 'networkidle2'
  }
  );
  console.log  ('page opened')
  //console.log(page);
  pa = page;
  //setTimeout(() => {pu.close()}, 5000)
  return page;
}

function getPu() {
  return pu ? Promise.resolve(pu) : getExistingBrowser()
  .then(res => {
    console.dir(res, {depth: 0})
    //console.log("pu:");
    //console.dir(pu, {depth: 1});
    return res ? res : pu ?  pu : console.log('neither of existing instance nor new Browser instance available');
  }).catch(err => console.log('error in getPu'))
}

function getPage() {
  console.log('pEval from inner')
  return getPu().then(res => res.pages())
  .then(res => {
    let names = [res[0].title(), res[1].title()];
    let pages2 = [res[0], res[1]];
    let page;
    return Promise.all(names)
      .then(res => {
        page = res[0] ? pages2[0] : pages2[1];
        console.dir('page ' + page, {depth: 0})
        return page;
      })
    //return page;
  }).catch(err => console.log('error in getPage'))
}


module.exports = {loadPuppeteer, loadPage, getPu, getPage, getExistingPage};
