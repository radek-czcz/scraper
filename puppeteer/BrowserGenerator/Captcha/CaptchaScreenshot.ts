import { Page, Browser, ElementHandle } from 'puppeteer';
import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass';
import screenshotEvalFunction from './ScreenshotMethod2';
import { createWriteStream } from 'node:fs'
import '../container';
import {container} from 'tsyringe';

export default class CaptchaScreenshot {

	page:Promise<Page>;


	constructor(page:Promise<Page>) {
		this.page = page;
	}

	makeScreenshot():ReturnType<typeof screenshotEvalFunction> {

		const captchaImageSelector = container.resolve('captcha-selector');

		const captchaContainer:Promise<ElementHandle<HTMLImageElement>> = this.page
		.then((tab:Page) => tab.$(captchaImageSelector as string))
		.then((res:ElementHandle<HTMLImageElement>|null) => {
			if (!res) throw new Error('Selector not found')
			else return res;
		})

		const sShot = captchaContainer.then(screenshotEvalFunction)

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