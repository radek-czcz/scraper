import {BrowserSubClass} from './BrowserSubClass'
import {Browser, Page} from 'puppeteer'
import net, {Server, Socket} from 'net';
import puppeteer from 'puppeteer-extra';

export class ExistingBrowserSubClass extends BrowserSubClass {

	constructor() {
		super();
	}
	
	launchBrowser(headless:boolean = false):Promise<Browser> {
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

		    client.on('error', function() {
		      rejFunc();
		    })
		})

		let connectedBrowser:Promise<Browser> = connect.then(() => puppeteer.connect(
			{
			  browserWSEndpoint: endpoint,
			}
		))

		connectedBrowser.catch((err:Error) => console.log(err));

		return connectedBrowser;
	}

}

// let brs = new ExistingBrowserSubClass()