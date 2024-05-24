const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

let pu;
let pa;
let exBr;

puppeteer.use(StealthPlugin());

function loadPuppeteer(headless) {
  return puppeteer.launch({
      headless: headless,
      args: ['--no-sandbox'],
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
      {browserWSEndpoint: 'ws://127.0.0.1:64599/devtools/browser/5610fa6f-e961-4a34-bddf-e6444b7b4945'}
  ).then(res => {
    // console.dir(res, {depth: 0});
    exBr = res;
    return res;
  });
}

function getExistingPage() {
  return exBr.pages().then(res => res[0])
}

async function loadPage(url) {
  const page = await pu.pages();
  await page[0].goto(url, {
    waitUntil: 'networkidle2'
  });
  console.log  ('page opened')
  return page;
}

function getPu() {
  return pu ? Promise.resolve(pu) : getExistingBrowser()
  .then(res => {
    // console.dir(res, {depth: 0})
    //console.log("pu:");
    //console.dir(pu, {depth: 1});
    return res ? res : pu ?  pu : console.log('neither of existing instance nor new Browser instance available');
  }).catch(err => console.log('error in getPu'))
}

function getPage() {
  console.log('pEval from inner')
  return getPu().then(res => res.pages())
  .then(res => res[0])
  .catch(err => console.log('error in getPage'))
}


module.exports = {loadPuppeteer, loadPage, getPu, getPage, getExistingPage};
