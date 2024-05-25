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

		let page:Page;
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

		let cokkieF:any = getCookies();

		let pagePromise:Promise<Page> = getPage().then(res => {if (res) return res; else throw 'page not available'})
		.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

		let setC:Promise<void> = pagePromise
		.then((res:Page) => {
			page = res;
	    })
	    .then(() => {if (page) return page.setCookie(...cookies)})
	    .then(
	    	(res:void) => {console.log('cookies have been set'); process.stdout.write('cookies set'); page.browser().disconnect();},
	    	(rej:void) => {console.error(rej); return page.browser().disconnect()}
	    )
	    .catch(err => {console.log('cookies could not been set'); page.browser().disconnect()});
	})
}
connectToExistingInstance();
