import {Browser, Page} from 'puppeteer';
import puppeteer from 'puppeteer-extra';
// import {PuppeteerExtra} from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

let pu: Browser;
let pa: Page;
let exBr: Browser;

// PuppeteerExtra.use(StealthPlugin());

export function loadPuppeteer(headless: boolean): Promise<Browser> {
  return puppeteer.launch({
      executablePath:'E:/Users/Kamila i Radek/JavaScript workspace - scraper/node_modules/puppeteer/.local-chromium/105/chrome-win/chrome.exe',
      headless: headless,
      args: ['--no-sandbox'/*, '--incognito'*/],
      /*devtools: false,*/
      slowMo:300
      //args: ['--no-sandbox', '--incognito']
  })
  .then(res => {
    // console.dir(res, {depth: 0})
    pu = res;
    return res;
  })
  //return inst.then(res => res)
  //return inst;
}
