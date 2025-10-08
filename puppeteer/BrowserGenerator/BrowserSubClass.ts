import "reflect-metadata";
import {Browser, Page} from 'puppeteer'
import puppeteer from 'puppeteer-extra';
import net, {Server, Socket} from 'net';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import {injectable, inject} from 'tsyringe';

@injectable()
export class BrowserSubClass {

	protected browserInstance:Promise<Browser>;

	protected server:Server|null = null;

	launchBrowser(headless:boolean = false):Promise<Browser> {
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

	constructor(
		@inject('port') protected port:number,
		@inject('headless') private headless:boolean
	) {
		puppeteer.use(StealthPlugin());
		this.browserInstance = this.launchBrowser(this.headless);

		process.on('exit', () => this.browserInstance
			.then((br:Browser) => {br.close(); console.log('browser closed');})
		)
		process.on('error', () => this.browserInstance
			.then((br:Browser) => br.close())
		)
		process.on('SIGINT', () => this.browserInstance
			.then((br:Browser) => {br.close(); console.log('browser closed');})
		)
	}

	protected  endpoint():Promise<string> {
		return this.browserInstance.then(br => br.wsEndpoint())
	};

	public get browser():Promise<Browser> {
		return this.browserInstance;
	}

	get tab0():Promise<Page> {
		return this.browserInstance
		.then((browser:Browser) => browser.pages())
		.then(pages => pages[0]);
	}

	// make .net server to pass the Puppeteer's browser wsEndpoint
	public establishNetServer() {

		function dataEventHandler(this:BrowserSubClass, data:any) {
			if (data.toString() === "close server, please") {
			  console.log('net.server says: client requested to close server');
			  this.server?.close(() => console.log('server closed'));
			}
		}

		let createServerHandler = (connection:Socket) => {
			console.log('net.server says: client connected');

			connection.on('end', function() {
				console.log('net.server says: client disconnected');
				// server.close(() => console.log('server closed'));
			});

			connection.on('data', dataEventHandler);

			this.endpoint().then((endp:string) => connection.write(endp));
			connection.pipe(connection);
		}

	    this.server = net.createServer(createServerHandler)

	    process.on('SIGINT', () => {this.server?.close(); console.log('net.server says: server closed, because prompted'); process.exit()})
	    process.on('exit', () => {this.server?.close(); console.log('net.server says: server closed, because of process exit')});
	    process.on('error', () => {this.server?.close(); console.log('net.server says: server closed, because of process error')})

		this.server.listen(this.port, function() { 
  			console.log('server is listening');
		});
	}
}
