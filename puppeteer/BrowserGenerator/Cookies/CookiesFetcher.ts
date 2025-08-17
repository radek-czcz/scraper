import { Page, Browser } from 'puppeteer'
import { writeFile } from 'node:fs/promises';
import { ExistingBrowserSubClass } from '../ExistingBrowserSubClass'
import {singleton, inject} from 'tsyringe';

@singleton()
export default class CookiesFetcher {

	constructor(
		private page:Promise<Page>,
		@inject('cookies-path') protected cookiesPath:string,
		@inject('cookies-urls') protected cookiesUrls:string[],
	) {}

	private writeToFile(cookies:object) {
		return writeFile(
			this.cookiesPath,
			JSON.stringify(cookies, null, 2))
		.then(() => console.log(`Cookies fetched and saved to file ${this.cookiesPath}`))
	}

	async fetchCookies():Promise<void> {
		// let cookiesUrls:string[] = [];
		let cookies:object;
		let page:Page = await this.page;
		cookies = await page.cookies(...this.cookiesUrls);
		return this.writeToFile(cookies);
	}
}

// let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();
// let tab:Promise<Page> = ebs.browser.then((br:Browser) => br.pages())
// .then((tabs:Page[]) => tabs[0])

// new CookiesFetcher(
// 	tab,
// 	'../../ConfigFiles/vulcan/cookies4.json',
// 	[
// 		'https://uonetplus.vulcan.net.pl/gminawolow', 
// 		'https://uonetplus-cdn.vulcan.net.pl', 
// 		'https://home.pl'
// 	]
// ).fetchCookies()
// .then(() => ebs.disconnectBrowser())

