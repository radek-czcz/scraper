import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Browser, Page } from 'puppeteer';
import "jasmine";
import net, {Server, Socket} from 'net';
import CommonBrowsers from './CommonBrowsers.spec';
import beforeF from './Before.spec'

describe('This suite should test BrowserSubClass\n', function(this:any) {

	beforeAll(beforeF)

	it("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", function(this:any) {
		expect('pages' in this.br && 'wsEndpoint' in this.br).toBeTrue();
	})

	it('Connection to net.server should get wsEndpoint', function() {
		let endpoint:string;
	  	let connect:Promise<Socket> = new Promise((resFunc, rejFunc) => {
		    let client:Socket = net.connect({port: 8088, timeout: 10000}, function() {
		      console.log('net.child says: connected to server!');  
		    });

		    client.on('data', function(data) {
		      console.log('net.child says: data received - ', data.toString());
		      endpoint = data.toString();
		      client.end();
		      resFunc(client);
		    });
		})
		return connect.then((soc:Socket) => {
			expect(endpoint).not.toBeFalsy();
		})
	})
})