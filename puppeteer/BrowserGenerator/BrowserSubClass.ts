import {loadPuppeteer} from './PuppeteerBrowserOperations/puppLoader'
import {Browser, Page} from 'puppeteer'
import puppeteer from 'puppeteer-extra';
import net, {Server, Socket} from 'net';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export class BrowserSubClass {

	browserInstance:Promise<Browser>;

	protected server:Server|null = null;

	protected launchBrowser(headless:boolean):Promise<Browser> {
		let browser:Promise<Browser> = puppeteer.launch({
			// executablePath:'E:/Users/Kamila i Radek/JavaScript workspace - scraper/node_modules/puppeteer/.local-chromium/105/chrome-win/chrome.exe',
			headless: headless,
			args: ['--no-sandbox'/*, '--incognito'*/],
			/*devtools: false,*/
			slowMo:300
			//args: ['--no-sandbox', '--incognito']
		})
		return browser
	}

	constructor() {
		puppeteer.use(StealthPlugin());
		this.browserInstance = this.launchBrowser(false);
	}

	protected  endpoint():Promise<string> {
		return this.browserInstance.then(br => br.wsEndpoint())
	};

	public get browser() {
		return this.browserInstance;
	}

	// make .net server to pass the Puppeteer's browser wsEndpoint
	public establishNetServer() {

		function dataEventHandler(this:BrowserSubClass, data:any) {
			if (data.toString() === "close server, please") {
			  console.log('net.server says: client requested to close server');
			  this.server?.close(() => console.log('server closed'));
			}
		}

		function createServerHandler(this:BrowserSubClass, connection:Socket) {
			console.log('net.server says: client connected');

			connection.on('end', function() {
				console.log('net.server says: client disconnected');
				// server.close(() => console.log('server closed'));
			});

			connection.on('data', dataEventHandler);

			this.endpoint().then((endp:string) => connection.write(endp));
			connection.pipe(connection);
		}

	    this.server = net.createServer(createServerHandler.bind(this))

		this.server.listen(8088, function() { 
  			console.log('server is listening');
		});
	}

	goToPage(url:string):Promise<Page> {
	  let pages:Promise<Page[]> = this.browserInstance.then(br => br.pages());
	  let going = pages.then((res) => res[0].goto(url, {waitUntil: 'networkidle2'}))
	  .catch(err => console.log(`browser could not navigate to the page address\n${err}`));
	  return Promise.all([pages, going]).then(res => {console.log('page opened'); return res[0][0]})
	}
}

// let brs = new BrowserSubClass();
// brs.establishNetServer();
// brs.goToPage('https://dziennik-uczen.vulcan.net.pl/gminawolow')
