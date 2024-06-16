import { getBrowserFromParentProcess, getPages } from './puppLoader';
import fs from 'fs';
import {Browser, Page} from 'puppeteer';
// import process from 'node:process';
import { argv } from 'node:process';

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
export function connectToExistingInstance():void {

	getBrowserFromParentProcess()
	.then(() => {

		argv.forEach(inp => console.log(inp))

		let argsOb:Function =  function():{} {
			let ob:{[key: string]: string} = {}
			argv.forEach((inp, index) => {
				if (inp.split("=").length === 2) ob[inp.split("=")[0]] = inp.split("=")[1]
				else ob[index] = inp
			})
			return ob;
		}

		let pathArg = argsOb().path

		let pathToCookies = pathArg ? pathArg : './cookies.json'

		let pages:Page[];
		let cookies:any;

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

		let cokkieF:Promise<void> = getCookies();

		let pagePromise:Promise<Page[]> = getPages().then(res => {if (res) return res; else throw 'page not available'})
		.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

		let setC:Promise<void> = pagePromise.then((res:Page[]) => {pages = res})

		let mapAndSet:Promise<void> = Promise.all([setC, cokkieF])
	    .then(() => {
	    	let ind:number;
	    	return Promise.all(pages.map((page:Page, idx:number) => {ind = idx; return page.setCookie(...cookies)}))
	    	.then((res:void[]) => console.log(`cookies on all pages set`))
		})
	    .then(
	    	(res:void) => {/*console.log('cookies have been set');*/ process.stdout.write('cookies set'); pages[0].browser().disconnect()},
	    	(rej:void) => {console.error(rej); return pages[0].browser().disconnect()}
	    )
	    .catch(err => {console.log('cookies could not been set'); pages[0].browser().disconnect()});
	})
}
connectToExistingInstance();
