import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { writeFile } from 'node:fs/promises';
import {Browser, Page} from 'puppeteer';

function connectToExistingInstance() {
	getBrowserFromParentProcess()
	.then(() => {
		let page:Page;
		let cookies:any[];
		function fetchFunc1():Promise<void> {return writeFile('./cookies.json', JSON.stringify(cookies, null, 2))}
		function fetchFunc2():void {console.log(cookies)}

		let pagePromise:Promise<Page> = getPage()
		.catch(err => {console.log('getPage() function failed: ', err); throw err});

		let fetchCookies = pagePromise
		.then(async (res) => {
			page = res;
			cookies = await page.cookies();
			// return writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
			return fetchFunc1()
		})

		let exitAll:Promise<void> = fetchCookies.then(() => {
			process.stdout.write('ended'); 
			page.browser().disconnect();
		})
		return exitAll;
	})
}

connectToExistingInstance();

export default connectToExistingInstance