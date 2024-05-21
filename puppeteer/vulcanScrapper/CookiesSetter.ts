import { getBrowserFromParentProcess, getPage } from './puppLoader';
import fs from 'fs';
import {Browser, Page} from 'puppeteer';
// import process from 'node:process';
import { argv } from 'node:process';

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
export function connectToExistingInstance():void {

	getBrowserFromParentProcess()
	.then(() => {

		// type tp = argv['path']
		let arg1 = argv['path']
		
		let pathToCookies = arg1 ? arg1 : './cookies.json'

		let page:Page;
		let cookies:Object[];

		function getCookies():Promise<void> {
			return new Promise ((res1, rej) => fs.readFile(pathToCookies, function(err, data) {
				if(err) {
					console.log('reading cookies file failed');
					throw err;
				}
				cookies = JSON.parse(data.toString());
				res1()
			}))
		}

		let cokkieF:Object = getCookies();

		let pagePromise:Promise<Page|void> = getPage()
		.catch((err:Error) => console.log('getPage() function failed: ', err));

		let setC:Promise<void> = pagePromise
		.then((res:Page) => {
			page = res;
	    })
	    .then(() => page.setCookie(...cookies))
	    .then(
	    	(res:void) => {console.log('cookies have been set'); process.stdout.write('cookies set')},
	    	(rej:void) => {console.error(rej); return page.browser().disconnect()}
	    )
	    .catch(err => {console.log('cookies could not been set'); page.browser().disconnect()});
	})
}
connectToExistingInstance();
