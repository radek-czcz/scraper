import {Browser, Page, JSONArray, HTTPResponse} from 'puppeteer';
import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass'
import StorageDataReader from '../Cookies/StorageDataReader'
import StorageDataInserter from '../Cookies/StorageDataInserter'
import CookiesReader from '../Cookies/CookiesReader'

export default class LoginOperator {

	private page:Promise<Page>;
	private credentials:[string, string];

	constructor(page:Promise<Page>, credentials:[/*user*/string, /*password*/string]) {
		this.page = page
		this.credentials = credentials
	}

	async writeLogin(selector:string):Promise<void> {
		let page = await this.page;
		page.waitForSelector(selector);
		return page.type(selector, this.credentials[0], {delay: 100});
	}

	async writePassword(selector:string):Promise<void> {
		let page = await this.page
		page.waitForSelector(selector);
		return page.type(selector, this.credentials[1], {delay: 100})
	}

	async clickNext(selector:string):Promise<void> {
		let page = await this.page;
		page.waitForSelector(selector);
		return page.click(selector);
	}
}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let lo:LoginOperator = new LoginOperator(tab, ['AAABOLQ-002234', '']);
Promise.all([br, tab])
.then((res:[Browser, Page]) => Promise.all([lo.writeLogin('input#Login'), br]))
.then((res:[void, Browser]) => Promise.all([lo.clickNext('button#btNext'), res[1]]))
// .then((res:[Browser, Page]) => Promise.all([lo.writePassword('input#Haslo'), br]))
// .then((res:[Browser, Page]) => Promise.all([lo.clickLogin('button#btNext'), br]))
// .then((br2:[void, Browser]) => br2[1].disconnect());
.then((br2:[void, Browser]) => br2[1].disconnect());