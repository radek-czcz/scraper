// import { getPages } from '../../BrowserGenerator/PuppeteerBrowserOperations/puppLoader';
// import process from 'node:process';
// import { argv } from 'node:process';
import fs from 'fs';
import { writeFile, readFile } from 'node:fs/promises';
import {Browser, Page, JSONArray, HTTPResponse} from 'puppeteer';
import {ExistingBrowserSubClass} from './ExistingBrowserSubClass'
import StorageDataReader from './Cookies/StorageDataReader'
import StorageDataInserter from './Cookies/StorageDataInserter'
import CookiesReader from './Cookies/CookiesReader'


export class CookiesSetter {

	private page:Promise<Page>;

	constructor(page:Promise<Page>) {
		this.page = page;
	}

	public setCookies():Promise<null | HTTPResponse> {

		let reloadPage = () => {
			return this.page
			.then((tab:Page) => tab.reload({waitUntil:'networkidle0'}));
		}

		let ins:Promise<void> = new StorageDataReader(
			["../ConfigFiles/vulcan/local.json", "../ConfigFiles/vulcan/session.json"]
		).readStorageData().then(res => new StorageDataInserter(this.page).insertData(res));

		return Promise.all([
			ins,
			CookiesReader.getCookies('../ConfigFiles/vulcan/cookies.json'),
			this.page
		 ]).then((res:[void, JSONArray, Page]) => res[2].setCookie(...<any>res[1]))
		.then(() => reloadPage());
	}
}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0])

let cs:CookiesSetter = new CookiesSetter(tab)
Promise.all([br, tab])
.then((res:[Browser, Page]) => Promise.all([cs.setCookies(), br]))
.then((br2:[HTTPResponse | null, Browser]) => br2[1].disconnect());






