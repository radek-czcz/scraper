import { Page, Browser, ElementHandle } from 'puppeteer'
import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass'

export default class CaptchaScreenshot {

	page:Promise<Page>;

	constructor(page:Promise<Page>) {
		this.page = page;
	}

	makeScreenshot():Promise<string|Buffer> {
		const container = this.page.then((tab:Page) => tab.$('div.v-captcha-container'))

		let sShot = container.then((captchaContainer:ElementHandle|null) => {
			if (captchaContainer) {
				console.log('Captcha element found')
				return captchaContainer.screenshot({
					encoding: /*'base64'*/ 'binary',
					path: 'ca2.jpg',
					type: 'jpeg',
					quality: 80
				})}
			else throw "No captcha's selector found. Screeenshot taking failed"
		})

		sShot.then(() => process.stdout.write('screenshot taken\n'), (err) => console.log(err))

		return sShot;
	}
}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let cs:CaptchaScreenshot = new CaptchaScreenshot(tab);
Promise.all([cs.makeScreenshot(), br])
.then((arr:[string|Buffer, Browser]) => arr[1].disconnect())