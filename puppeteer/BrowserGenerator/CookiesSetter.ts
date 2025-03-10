// import { getPages } from '../../BrowserGenerator/PuppeteerBrowserOperations/puppLoader';
// import process from 'node:process';
// import { argv } from 'node:process';
import fs from 'fs';
import { writeFile, readFile } from 'node:fs/promises';
import {Browser, Page, JSONArray} from 'puppeteer';
import {ExistingBrowserSubClass} from './ExistingBrowserSubClass'

interface ErrnoException extends Error {
    errno?: number | undefined;
    code?: string | undefined;
    path?: string | undefined;
    syscall?: string | undefined;
}

export class CookiesSetter {

	pathToCookies = '../ConfigFiles/vulcan/cookies.json';
	cookies:any;

	private page:Promise<Page>;

	constructor(page:Promise<Page>) {
		this.page = page;
	}

	private getLocalStorage():Promise<JSONArray> {
		const localStorageString:Promise<Buffer> = readFile("../ConfigFiles/vulcan/local.json");
		return localStorageString.then((res:Buffer) => JSON.parse(res.toString()));
	}

	private getSessionStorage():Promise<JSONArray> {
		const sessStorageString:Promise<Buffer> = readFile("../ConfigFiles/vulcan/session.json");
		return sessStorageString.then((res:Buffer) => JSON.parse(res.toString()));
	}

	public setCookies() {
		let sessionDataSet = Promise.all([this.getLocalStorage(), this.getSessionStorage()])
		.then(this.applySessionAndLocalData)
	}

	private getCookies():Promise<JSONArray> {
		return new Promise ((res1, rej) => fs.readFile(this.pathToCookies, function(this:any, err:ErrnoException | null, data:Buffer) {
			if(err) {
				console.log('reading cookies file failed');
				throw err;
			}
			// this.cookies = JSON.parse(data.toString());
			res1(JSON.parse(data.toString()))
		}))
	}

	private applySessionAndLocalData(data:[JSONArray, JSONArray]) {
		this.page.then((tab:Page) => tab.evaluate(
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

}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let tab:Promise<Page> = ebs.launchBrowser()
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0])

let cs:CookiesSetter = new CookiesSetter(tab)
cs.getCookies().then((res:JSONArray) => console.log(res));







