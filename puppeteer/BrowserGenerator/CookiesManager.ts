import {Browser, Page, JSONArray, HTTPResponse} from 'puppeteer';
import StorageDataReader from './Cookies/StorageDataReader'
import StorageDataInserter from './Cookies/StorageDataInserter'
import CookiesReader from './Cookies/CookiesReader';
import {injectable, container, singleton, inject} from 'tsyringe'

@singleton()
export class CookiesManager {

	// protected _page:Promise<Page> = container.resolve(Promise<Page>);

	constructor(
		protected _page:Promise<Page>,
		@inject('cookies-path') protected cookiesPath:string
	) {}

	protected readCookiesFromFile(path:string):Promise<JSONArray> {
		return CookiesReader.getCookies(path/*path+'cookies.json'*/)
	}

	public setCookies():Promise<null | HTTPResponse> {

		const cookies = this.readCookiesFromFile(this.cookiesPath)

		const insertStorage = this.insertStorageData();

		let insertCookies = Promise.all([
			cookies,
			this._page
		]).then((res:[JSONArray, Page]) => res[1].setCookie(...<any>res[0]));
		let reload = Promise.all([
			insertStorage,
			insertCookies
		])
		.then(() => {console.log('Cookies inserted and reloading Page'); return this.reloadPage()});

		return reload;
	}

	protected readStorageData(path:string):Promise<[JSONArray, JSONArray]> {
		return new StorageDataReader(
			[path+'local.json', path+'session.json']
		).readStorageData();
	}

	public insertStorageData():Promise<void> {
		return this.readStorageData('../ConfigFiles/vulcan/')
		.then((res:[JSONArray, JSONArray]) => new StorageDataInserter(this._page).insertData(res));	
	}

	protected checkedReload(promiseConditions:Promise<any>[]) {
		let reload = Promise.all(promiseConditions)
		.then(() => {console.log('Cookies inserted and reloading Page'); return this.reloadPage()});
	}

	protected reloadPage():Promise<HTTPResponse | null> {
		return this._page
		.then((tab:Page) => tab.reload({waitUntil:'networkidle0'}));
	}
}

// let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

// let br:Promise<Browser> = ebs.browser

// let tab:Promise<Page> = br
// .then((browser:Browser) => browser.pages())
// .then((tabs:Page[]) => tabs[0]);

// let cs:CookiesManager = new CookiesManager(tab);
// Promise.all([br, tab])
// .then((res:[Browser, Page]) => Promise.all([cs.setCookies('../ConfigFiles/vulcan/'), br]))
// .then((br2:[HTTPResponse | null, Browser]) => br2[1].disconnect());
