// const puppeteer = require('puppeteer-extra');
import {Browser, Page} from 'puppeteer'
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import {Server}, net from 'net';

let pu: Browser;
let exBr: Browser;
let endpoint: string;
let server: Server;

puppeteer.use(StealthPlugin());

function loadPuppeteer(headless): Promise<Browser> {
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

async function loadPage(url): Page {
  const page:Page[] = await pu.pages();
  await page[0].goto(url, {
    waitUntil: 'networkidle2'
  }).catch(err => console.log(`browser could not navigate to the page address\n${err}`));
  console.log  ('page opened')
  return page;
}

function getPu(): Promise<Browser> {
  return pu ? Promise.resolve(pu) : getExistingBrowser()
  .then((res:Browser) => {
    console.dir(res, {depth: 0})
    //console.log("pu:");
    //console.dir(pu, {depth: 1});
    return res ? res : pu ?  pu : console.log('neither of existing instance nor new Browser instance available');
  }).catch(err => console.log('error in getPu'))
}

function getPage(): Promise<Page | void> {
  console.log('pEval from inner')
  return getPu().then((res:Browser) => res.pages())
  .then((res: Page[]) => res[0])
  .catch((err:Error) => console.log('error in getPage'))
}

function getBrowserFromParentProcess(): Promise<Browser> {
  let endpoint:string;

  let connect:Promise<void> = new Promise((resFunc:void, rejFunc:void) => {
    let client = net.connect({port: 8088}, function() {
      console.log('net.child says: connected to server!');  
    });

    client.on('data', function(data) {
      console.log('net.child says: data received - ', data.toString());
      endpoint = data.toString();
      client.end();
      res(client);
    });
    
    client.on('end', function() { 
      console.log('net.child says: disconnected from server');
    });
  })

  console.log('endpoint from getBrowserFromParentProcess(): ', endpoint)

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

// module.exports = { loadPuppeteer, loadPage, getPu, getPage, getExistingPage, getBrowserFromParentProcess };
export { loadPuppeteer, loadPage, getPu, getPage, getExistingPage, getBrowserFromParentProcess };
