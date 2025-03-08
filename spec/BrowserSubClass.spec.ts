import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Browser, Page } from 'puppeteer';
import "jasmine";
import net, {Server, Socket} from 'net';
import beforeSetup from './Before.spec'

describe('This suite should test BrowserSubClass\n', function(this:any) {

	beforeAll(beforeSetup)

	function browserExpectation(this:any) {
		expect('pages' in this.br && 'wsEndpoint' in this.br).toBeTrue();
	}

	function beforeServerFunction(this:any) {
		this.br2.establishNetServer.call(this.br2)
	}

	it("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", browserExpectation)

	function innerDescribe() {

		// beforeAll(beforeServerFunction)

		function serverFunctionExpectation() {
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
			})
			return connect.then((soc:Socket) => {
				expect(endpoint).not.toBeFalsy();
			})
		}

		it('Connection to net.server should get wsEndpoint', serverFunctionExpectation)
	}

	describe('Server test should check if server provides wsEndpoint', innerDescribe)
})