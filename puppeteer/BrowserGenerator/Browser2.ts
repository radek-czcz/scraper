import {loadPuppeteer} from './PuppeteerBrowserOperations/puppLoader'
import {Browser} from 'puppeteer'

class Browser2 {
	browser:Promise<Browser>;

	constructor(browser:Promise<Browser>) {
		this.browser = browser
	}
}

let brs = new Browser2(loadPuppeteer(false));
