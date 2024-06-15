// const puppeteer = require('puppeteer-extra');
import {Browser, Page} from 'puppeteer'
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import net, {Server, Socket} from 'net';

let pu: Browser;
let exBr: Browser;
let endpoint: string;
let server: Server;

puppeteer.use(StealthPlugin());

function loadPuppeteer(headless:boolean): Promise<Browser> {
  return puppeteer.launch({
      // executablePath:'E:/Users/Kamila i Radek/JavaScript workspace - scraper/node_modules/puppeteer/.local-chromium/105/chrome-win/chrome.exe',
      headless: headless,
      args: ['--no-sandbox'/*, '--incognito'*/],
      /*devtools: false,*/
      slowMo:300
      //args: ['--no-sandbox', '--incognito']
  })
  .then((res:Browser) => {
    console.dir(res, {depth: 0})
    pu = res;
    endpoint = pu.wsEndpoint();

    server = net.createServer(function(connection) {
      console.log('net.server says: client connected');

      connection.on('end', function() {
        console.log('net.server says: client disconnected');
        // server.close(() => console.log('server closed'));
      });

      connection.on('data', function(data) {
        if (data.toString() === "close server, please") {
          console.log('net.server says: client requested to close server');
          server.close(() => console.log('server closed'));
        }
      });

      connection.write(endpoint);
      connection.pipe(connection);
    });

    server.listen(8088, function() { 
      console.log('server is listening');
    });

    console.log('endpoint in loader: ', endpoint);
    return res;
  })
}

function getExistingBrowser(): Promise<Browser> {
  console.log('endpoint: ', endpoint)
  return puppeteer.connect(
      {browserWSEndpoint: endpoint}
  ).then((res:Browser) => {
    console.dir(res, {depth: 0});
    exBr = res;
    return res;
  });
}

function getExistingPage(): Promise<Page> {
  return exBr.pages().then((res: Page[]) => res[0])
}

function loadPage(url:string):Promise<Page> {
  let pages:Promise<Page[]> = pu.pages();
  let going = pages.then((res) => res[0].goto(url, {waitUntil: 'networkidle2'}))
  .catch(err => console.log(`browser could not navigate to the page address\n${err}`));
  return Promise.all([pages, going]).then(res => {console.log('page opened'); return res[0][0]})
}

function loadPages(urls:string[]):Promise<Page[]> {
  console.log('loading');
  let pages:Promise<Page[]> = pu.pages();
  // let going = pages.then((res) => res[0].goto(urls, {waitUntil: 'networkidle2'}))
  let tout = 0;

  function innFunc(page:Page, idx:number):Promise<void> {return new Promise<void>((resolve:Function) => {
    setTimeout(() => page.goto(urls[idx], {waitUntil: 'networkidle2'}).then(() => resolve()), tout)
    tout = tout + 5000;
  })}
  
  let going:Promise<void | Promise<any>[]> = pages.then((res:Page[]) => res.map(innFunc))
  .catch(err => console.log(`browser could not navigate to the page address\n${err}`));
  return Promise.all([pages, going]).then(res => {console.log('pages opened'); return pages})
}

function getPu(): Promise<Browser> {
  let brwsr:Promise<Browser> = pu ? Promise.resolve(pu) : getExistingBrowser()
  brwsr.catch(err => console.log('error in getPu'))
  return brwsr;
  // .then((res:Browser) => {
  //   console.dir(res, {depth: 0})
    //console.log("pu:");
    //console.dir(pu, {depth: 1});
    // if (res) return res
    // else return pu
    // return res ? res : pu ?  pu : console.log('neither of existing instance nor new Browser instance available');
  // }).catch(err => console.log('error in getPu'))
}

function getPage(): Promise<Page> {
  console.log('pEval from inner')
  return getPu().then((res:Browser) => res.pages())
  .then((res: Page[]) => res[0])
  .catch((err:Error) => {console.log('error in getPage'); throw err})
}

function getPages(): Promise<Page[]> {
  console.log('pEval from inner')
  return getPu().then((res:Browser) => res.pages())
  .catch((err:Error) => {console.log('error in getPage'); throw err})
}

function getPageWithSelect(): Promise<Page> {
  let tabId = 0
  let allTabs:Promise<Page[]> = getPu().then((res:Browser) => res.pages());
  let tabsCount:Promise<number> = allTabs.then((res:Page[]) => new Promise<number>((resolve1:Function) => {if (res.length > 1) {
        console.log(`puppLoader > getPage(), question: which (non-zero) tab should be used? There are ${res.length} tabs available`);
        let ev = process.stdin.on('data', (data:Buffer) => {
          tabId = parseInt(data.toString()) - 1;
          resolve1(tabId);
        });
      } else {
        resolve1(0)
      }
    }));

  return Promise.all([allTabs, tabsCount]).then((res:[Page[], number]) => {
    process.stdin.pause();
    process.stdin.removeAllListeners();
    return res[0][res[1]] 
  })
  .catch((err:Error) => {console.log('error in getPage'); throw err})
}

function getBrowserFromParentProcess():Promise<Browser> {
  let endpoint:string;

  let connect:Promise<Socket> = new Promise((resFunc, rejFunc) => {
    let client:Socket = net.connect({port: 8088}, function() {
      console.log('net.child says: connected to server!');  
    });

    client.on('data', function(data) {
      console.log('net.child says: data received - ', data.toString());
      endpoint = data.toString();
      client.end();
      resFunc(client);
    });
    
    client.on('end', function() { 
      console.log('net.child says: disconnected from server');
    });
  })

  // console.log('endpoint from getBrowserFromParentProcess(): ', endpoint)

  return connect.then(() => puppeteer.connect(
    {
      browserWSEndpoint: endpoint,
    }
  ))
  .then(res => {
    pu = res;
    return res;
  });
}

function refreshPage():Promise<any> {
  return getBrowserFromParentProcess().then((res:Browser) => res.pages()).then((res:Page[]) => res[0].reload({ waitUntil: 'domcontentloaded'/*'networkidle2'*/ }));
}

// module.exports = { loadPuppeteer, loadPage, getPu, getPage, getExistingPage, getBrowserFromParentProcess };
export { loadPuppeteer, loadPage, getPu, getPage, getExistingPage, getBrowserFromParentProcess, refreshPage, getPageWithSelect, loadPages, getPages };
