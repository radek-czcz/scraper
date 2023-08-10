const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

var pu;
var pa;

puppeteer.use(StealthPlugin());

async function loadPuppeteer(headless) {
  var inst = puppeteer.launch({
      headless: headless,
      args: ['--no-sandbox', '--incognito'],
      /*devtools: false,*/
      slowMo:300
      //args: ['--no-sandbox', '--incognito']
  });

  inst.then(res => {/*res.close();*/ pu = res}, rej => {console.log(rej)})
  return inst;
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
}

function getPu() {
  return pu;
}

function getPage() {
  return pa;
}

module.exports = {loadPuppeteer, loadPage, getPu, getPage};
