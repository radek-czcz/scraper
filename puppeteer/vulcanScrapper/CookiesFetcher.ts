import { getBrowserFromParentProcess, getPage } from './puppLoader';
import { writeFile } from 'node:fs/promises';
import {Browser, Page} from 'puppeteer';
import {getArg} from './ArgsOperator'

function connectToExistingInstance() {
	getBrowserFromParentProcess()
	.then((brwsr:Browser) => {
		let cookies:any[];
		function fetchFunc1():Promise<void> {return writeFile(getArg('cookiesPath')/*'./cookies.json'*/, JSON.stringify(cookies, null, 2))}
		function fetchFunc2():void {console.log(cookies)}

		let pages:Promise<Page[]> = brwsr.pages()
		// let pagePromise:Promise<Page> = getPage()
		.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

		let fetchCookies = pages
		.then((res:Page[]) => {
			let arr:Promise<object>[] = [];
			res.forEach((p:Page) => arr.push(p.cookies()));
			return Promise.all(arr).then((coo:object[]) => 
				{	
					cookies = coo.flat(2)
					return fetchFunc1()
				})
		})

		let exitAll:Promise<void> = fetchCookies.then(() => {
			process.stdout.write('ended'); 
			brwsr.disconnect();
		})

		let catcher = exitAll.catch(err => console.log(err));
		return exitAll;
	})
}

// connectToExistingInstance();

export default connectToExistingInstance