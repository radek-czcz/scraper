import { Page, Browser } from 'puppeteer'
import { writeFile } from 'node:fs/promises';
import { ExistingBrowserSubClass } from '../ExistingBrowserSubClass'

export default class CookiesFetcher {
	page:Promise<Page>

	constructor(page:Promise<Page>) {
		this.page = page
	}

	private writeToFile(cookies:object) {
		return writeFile(
			'cookies.json',
			/*'./cookies.json'*/
			JSON.stringify(cookies, null, 2))
	}

	async fetchCookies():Promise<void> {
		let cookies:object;
		let page:Page = await this.page
		cookies = await page.cookies(
			'https://uonetplus.vulcan.net.pl/gminawolow', 
			'https://uonetplus-cdn.vulcan.net.pl', 
			'https://home.pl'
		)/*.then((res:object) => res.flat(2))*/
		return this.writeToFile(cookies)
	}
}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();
let tab:Promise<Page> = ebs.browser.then((br:Browser) => br.pages())
.then((tabs:Page[]) => tabs[0])

new CookiesFetcher(tab).fetchCookies()

