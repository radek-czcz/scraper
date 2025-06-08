import {Browser, Page, JSONArray, HTTPResponse, ElementHandle} from 'puppeteer';
import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass'
import StorageDataReader from '../Cookies/StorageDataReader'
import StorageDataInserter from '../Cookies/StorageDataInserter'
import CookiesReader from '../Cookies/CookiesReader'
import type { NodeFor } from 'puppeteer-core';

export default class LoginOperator {

	private page:Promise<Page>;
	private credentials:[string, string];

	constructor(page:Promise<Page>, credentials:[/*user*/string, /*password*/string]) {
		this.page = page
		this.credentials = credentials
	}

	async writeLogin(selector:string):Promise<void> {
		let page = await this.page;
		this.waitForSelector(selector)
		.then(() => console.log('(Login input-box)'));
		return page.type(selector, this.credentials[0], {delay: 100});
	}

	async writePassword(selector:string):Promise<void> {
		let page = await this.page
		this.waitForSelector(selector)
		.then(() => console.log('(Password input-box)'));
		return page.type(selector, this.credentials[1], {delay: 100})
	}

	async clickNext(selector:string):Promise<void> {
		let page = await this.page;
		this.waitForSelector(selector)
		.then(() => console.log('(Next button)'));
		return page.click(selector);
	}

	waitForSelector(selector:string):Promise<ElementHandle<NodeFor<string>> | null> {
		const page = this.page;
		const waiter = page.then((tab:Page) => tab.waitForSelector(selector, {timeout:5000}));
		return waiter.then(
			(el:ElementHandle<NodeFor<string>> | null) => {process.stdout.write('found ' + selector + ' '); return el}/*, 
			() => {throw new Error('selector ' + selector + ' not found')}*/
		);
	}
}

/*let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let lo:LoginOperator = new LoginOperator(tab, ['AAABOLQ-002234', 'HBMCTrojka3']);
Promise.all([br, tab])
.then((res:[Browser, Page]) => Promise.all([lo.writeLogin('input#Login'), br]))
// .then((res:[Browser, Page]) => Promise.all([lo.writePassword('input#Haslo'), br]))
.then((res:[void, Browser]) => Promise.all([lo.clickNext('button#btNext'), res[1]]))
// .then((res:[void, Browser]) => Promise.all([lo.clickNext('button#btLogOn'), res[1]]))
// .then((res:[Browser, Page]) => Promise.all([lo.clickLogin('button#btLogOn'), br]))
// .then((br2:[void, Browser]) => br2[1].disconnect());
.then((br2:[void, Browser]) => br2[1].disconnect());*/