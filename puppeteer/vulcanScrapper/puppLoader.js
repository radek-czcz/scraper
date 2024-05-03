// const puppeteer = require('puppeteer-extra');
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import net from 'net';

let pu;
let pa;
let exBr;
let endpoint;
let server;

puppeteer.use(StealthPlugin());

function loadPuppeteer(headless) {
  return puppeteer.launch({
      userDataDir: "./user_data",
      headless: headless,
      args: ['--no-sandbox'/*, '--incognito'*/],
      /*devtools: false,*/
      slowMo:300
      //args: ['--no-sandbox', '--incognito']
  })
  .then(res => {
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

function getExistingBrowser() {
  console.log('endpoint: ', endpoint)
  return puppeteer.connect(
      {browserWSEndpoint: endpoint}
  ).then(res => {
    console.dir(res, {depth: 0});
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
    console.dir(res, {depth: 0})
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

function getBrowserFromParentProcess() {
  let endpoint;

  let connect = new Promise((res) => {
    let client = net.connect({port: 8088}, function() {
      console.log('net.child says: connected to server!');  
    });

    client.on('data', function(data) {
      console.log('net.child says: data received - ', data.toString());
      // endpoint = data.toString();
      
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
    {browserWSEndpoint: endpoint}
  ))
  .then(res => {
    pu = res;
    return res;
  });
}

// module.exports = { loadPuppeteer, loadPage, getPu, getPage, getExistingPage, getBrowserFromParentProcess };
export { loadPuppeteer, loadPage, getPu, getPage, getExistingPage, getBrowserFromParentProcess };
