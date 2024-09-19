import { getBrowserFromParentProcess, getPages } from '../../BrowserGenerator/PuppeteerBrowserOperations/puppLoader';
import fs from 'fs';
import {Browser, Page, JSONArray} from 'puppeteer';
// import process from 'node:process';
import { argv } from 'node:process';
import { writeFile, readFile } from 'node:fs/promises';

let cookies:any;

function getCommandLineArgs() {
	let ob:{[key: string]: string} = {}
	argv.forEach((inp, index) => {
		if (inp.split("=").length === 2) ob[inp.split("=")[0]] = inp.split("=")[1]
		else ob[index] = inp
	})
	return ob;
}

let pathArg = getCommandLineArgs().path

let pathToCookies = pathArg ? pathArg : '../ConfigFiles/vulcan/cookies.json'

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

function getLocalStorage():Promise<JSONArray> {
	const localStorageString:Promise<Buffer> = readFile("../ConfigFiles/vulcan/local.json");
	return localStorageString.then((res:Buffer) => JSON.parse(res.toString()));
}

function getSessionStorage():Promise<JSONArray> {
	const sessStorageString:Promise<Buffer> = readFile("../ConfigFiles/vulcan/session.json");
	return sessStorageString.then((res:Buffer) => JSON.parse(res.toString()));
}

function applySessionAndLocalData(data:[JSONArray, JSONArray]) {
	getPages().then((tabs:Page[]) => tabs[0].evaluate(
		(sData) => {
			console.log(sData);
			for (const [key, value] of Object.entries(sData[1])) {
				sessionStorage[key] = value;
			}
			for (const [key, value] of Object.entries(sData[0])) {
				localStorage[key] = value;
			}
		}, data
	))
}

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
export function connectToExistingInstance():void {

	getBrowserFromParentProcess().catch((err:Error) => console.log(err))
	.then(() => {

		let sessionDataSet = Promise.all([getLocalStorage(), getSessionStorage()])
		.then(applySessionAndLocalData)

		let pages:Page[];

		function disconnectPupp() {
			return pages[0].browser().disconnect()
		}

		let cokkieF:Promise<void> = getCookies();

		let pagePromise:Promise<Page[]> = getPages().then(res => {if (res) return res; else throw 'page not available'})
		.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

		let setC:Promise<void> = pagePromise.then((res:Page[]) => {pages = res})

		let mapAndSet:Promise<void> = Promise.all([setC, cokkieF, sessionDataSet])
	    .then(() => {
	    	let ind:number;

	    	function mappingFunc(page:Page, idx:number) {
				ind = idx;
				console.log(cookies);
				let returned = page.setCookie(...cookies);
				returned.then(() => console.log('cookies on page 0 set'), () => console.log('error coo'))
				return returned
	    	}

	    	return Promise.all(pages.map(mappingFunc))
	    	.then((res:void[]) => {console.log(`cookies on all pages set`)})
		})
	    .then(
	    	(res:void) => {process.stdout.write('cookies set'); return disconnectPupp()},
	    	(rej:void) => {console.error(rej); return disconnectPupp()}
	    )
	    .catch(err => {console.log('cookies could not been set'); disconnectPupp()});

	    return mapAndSet;
	})
}
