import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Browser, Page } from 'puppeteer';
import "jasmine";
import net, {Server, Socket} from 'net';

describe('This suite should test BrowserSubClass\n', function(this:any) {

	// let br:Browser;
	// let br2:BrowserSubClass;

	beforeAll(async function(this:any){
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
		this.url = 'www.google.com'
		this.br2 = await new BrowserSubClass();
		this.br = await this.br2.browser
		this.func = this.br2.establishNetServer.bind(this.br2)
		this.func2 = this.br2.goToPage.bind(this.br2, this.url)
	}/*, 10000*/)

	it("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", function(this:any) {
		expect('pages' in this.br && 'wsEndpoint' in this.br).toBeTrue();
	})

	it(`Function should make a net communication server on port 8088
		and respond with sending a puppeteer browser wsEndpoint address`, function(this:any) {
		expect(this.func/*this.br2.establishNetServer*/).not.toThrow();
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

	/*it('Function goTo should navigate to url', function(this:any) {
		return this.func2().then((p:Page) => {
			let funcRef = () => expect(p.url()).toContain(this.url);
			setTimeout(funcRef, 3000)
		})
	})*/
})