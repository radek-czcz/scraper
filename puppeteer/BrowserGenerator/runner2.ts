// import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
// import {Navigator} from './Navigator';
// import {Page} from 'puppeteer';
// import fetchCookies from '../BrowserTab/Cookies/CookiesFetcher'
import net, {Server, Socket} from 'net';
import {BrowserSubClass} from './BrowserSubClass'

// import config from '../ConfigFiles/vulcan/CookiesPaths'
// import setCookies from '../BrowserTab/Cookies/CookiesSetterProcess'

// let brs = new ExistingBrowserSubClass();

// let resolver:Function;

// navigate to url
	// new Navigator(brs.browser
	// 	.then(browser => browser.pages())
	// 	.then(pages => pages[0])
	// ).goToPage('https://www.google.com').then((page:Page) => page.browser().disconnect())

// read cookies from files
	// fetchCookies()

// insert cookies (ChildProcess)
	// let cookiesPromise:Promise<void> = new Promise(res => {resolver = res});
	// cookiesPromise.then(() => setCookies(config, resolver))

	function establishNetServer() {

		let server:Server ;

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

			connection.write('radek');
			connection.pipe(connection);
		}

	    server = net.createServer(createServerHandler)

		server.listen(8088, function() { 
  			console.log('server is listening');
		});

		process.on('SIGINT', () => {server.close(); console.log('server closed'); process.exit()})

		setTimeout(() => server.close(), 15000)
	}

	function connectTo() {
  		let endpoint:string;

	  	let connect:Promise<Socket> = new Promise((resFunc, rejFunc) => {
		    let client:Socket = net.connect({port: 8088}, function() {
		      console.log('net.child says: connected to server!');  
		    });

		    client.on('data', function(data) {
		      console.log('net.child says: data received - ', data.toString());
		      endpoint = data.toString();
		      client.end();
		    });
		    
		    client.on('end', function() { 
		      console.log('net.child says: disconnected from server');
		    });
		})
	}

	establishNetServer();
	connectTo();
	// setTimeout(() => connectTo(), 8000)