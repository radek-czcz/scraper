import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Browser } from 'puppeteer';
import "jasmine";
import net, {Server, Socket} from 'net';

describe('This suite should test BrowserSubClass\n', function() {

	let br:Browser;
	let br2:BrowserSubClass;

	beforeAll(async function(){
		br2 = await new BrowserSubClass();
		br = await br2.browser
	}, 10000)

	it("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", function() {
		expect('pages' in br && 'wsEndpoint' in br).toBeTrue();
	})

	it(`This function should make a net communication server on port 8088\n` + 
		'and respond with sending a puppeteer browser wsEndpoint address', function() {
		expect(br2).not.toBeFalsy();
		expect(br2.establishNetServer).not.toThrow();
		let endpoint:string;
	  	/*let connect:Promise<Socket> = new Promise((resFunc, rejFunc) => {
		    let client:Socket = net.connect({port: 8088}, function() {
		      console.log('net.child says: connected to server!');  
		    });

		    client.on('data', function(data) {
		      console.log('net.child says: data received - ', data.toString());
		      endpoint = data.toString();
		      client.end();
		      resFunc(client);
		    });
		})*/
	})
})