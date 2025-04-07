import { Page, Browser, ElementHandle } from 'puppeteer';
import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass';
import screenshotEvalFunction from './ScreenshotMethod2';
import { createWriteStream } from 'node:fs'

export default class CaptchaScreenshot {

	page:Promise<Page>;


	constructor(page:Promise<Page>) {
		this.page = page;
	}

	makeScreenshot():ReturnType<typeof screenshotEvalFunction> {
		const container:Promise<ElementHandle<HTMLImageElement>> = this.page
		.then((tab:Page) => tab.$('img.v-captcha-image'))
		.then((res:ElementHandle<HTMLImageElement>|null) => {
			if (!res) throw new Error('selector not found')
			else return res;
		})

		const sShot = container.then(screenshotEvalFunction)

		return sShot;
	}
}

// let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

// let br:Promise<Browser> = ebs.browser

// let tab:Promise<Page> = br
// .then((browser:Browser) => browser.pages())
// .then((tabs:Page[]) => tabs[0]);

// let cs:CaptchaScreenshot = new CaptchaScreenshot(tab);
// Promise.all([cs.makeScreenshot(), br])
// .then((arr:[any, Browser]) => arr[1].disconnect())