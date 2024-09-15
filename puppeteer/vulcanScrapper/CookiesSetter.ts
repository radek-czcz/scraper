import { getBrowserFromParentProcess, getPages } from './puppLoader';
import fs from 'fs';
import {Browser, Page, JSONArray} from 'puppeteer';
// import process from 'node:process';
import { argv } from 'node:process';
import { writeFile, readFile } from 'node:fs/promises';


// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
export function connectToExistingInstance():void {

	getBrowserFromParentProcess().catch((err:Error) => console.log(err))
	.then(() => {

		function getLocalStorage():Promise<JSONArray> {
			const localStorageString:Promise<Buffer> = readFile("./local.json");
			return localStorageString.then((res:Buffer) => JSON.parse(res.toString()));
		}

		function getSessionStorage():Promise<JSONArray> {
			const sessStorageString:Promise<Buffer> = readFile("./session.json");
			return sessStorageString.then((res:Buffer) => JSON.parse(res.toString()));
		}

		let sessionDataSet = Promise.all([getLocalStorage(), getSessionStorage()]).then((sessionData:[JSONArray, JSONArray]) => getPages().then((tabs:Page[]) => tabs[0].evaluate(
			(sData) => {
				console.log(sData);
				for (const [key, value] of Object.entries(sData[1])) {
					sessionStorage[key] = value;
				}
				for (const [key, value] of Object.entries(sData[0])) {
					localStorage[key] = value;
				}
			}, sessionData))
		)

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

		let mapAndSet:Promise<void> = Promise.all([setC, cokkieF, sessionDataSet])
	    .then(() => {
	    	let ind:number;
	    	return Promise.all(pages.map((page:Page, idx:number) => 
	    		{
	    			ind = idx;
	    			console.log(cookies)
	    			let returned = page.setCookie(...cookies);
	    			returned.then(() => console.log('cookies on page 0 set'), () => console.log('error coo'))
	    			/*returned.then(() => console.log('cookie on page set'));*/
	    			return returned
	    		}
	    	))
	    	.then((res:void[]) => {console.log(`cookies on all pages set`)/*; pages[0].cookies().then(res11 => console.log(res11));*/})
		})
	    .then(
	    	(res:void) => {/*console.log('cookies have been set');*/ process.stdout.write('cookies set'); pages[0].browser().disconnect()},
	    	(rej:void) => {console.error(rej); return pages[0].browser().disconnect()}
	    )
	    .catch(err => {console.log('cookies could not been set'); pages[0].browser().disconnect()});
	})
}
connectToExistingInstance();
