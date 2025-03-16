import {Browser, Page, JSONArray, HTTPResponse} from 'puppeteer';
import {ExistingBrowserSubClass} from './ExistingBrowserSubClass'
import StorageDataReader from './Cookies/StorageDataReader'
import StorageDataInserter from './Cookies/StorageDataInserter'
import CookiesReader from './Cookies/CookiesReader'

export class CookiesManager {

	private page:Promise<Page>;

	constructor(page:Promise<Page>) {
		this.page = page;
	}

	public setCookies(path:string):Promise<null | HTTPResponse> {

		let cookies:Promise<JSONArray> = CookiesReader.getCookies(path+'cookies.json');

		let storageDataRead:(Promise<[JSONArray, JSONArray]>) = new StorageDataReader(
			[path+'local.json', path+'session.json']
		).readStorageData();

		let storageDataInsert:StorageDataInserter = new StorageDataInserter(this.page);

		let reloadPage:Function = () => {
			return this.page
			.then((tab:Page) => tab.reload({waitUntil:'networkidle0'}));
		}

		let insertStorage:Promise<void> = storageDataRead
		.then((res:[JSONArray, JSONArray]) => new StorageDataInserter(this.page).insertData(res));

		let insertCookies = Promise.all([
			cookies,
			this.page
		]).then((res:[JSONArray, Page]) => res[1].setCookie(...<any>res[0]));

		let reload = Promise.all([
			insertStorage,
			insertCookies
		])
		.then(() => reloadPage());

		return reload;
	}
}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let cs:CookiesSetter = new CookiesSetter(tab);
Promise.all([br, tab])
.then((res:[Browser, Page]) => Promise.all([cs.setCookies('../ConfigFiles/vulcan/'), br]))
.then((br2:[HTTPResponse | null, Browser]) => br2[1].disconnect());