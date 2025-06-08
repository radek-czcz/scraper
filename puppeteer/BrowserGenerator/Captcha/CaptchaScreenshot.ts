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

	makeScreenshot():Promise<void> {
		process.stdout.write('Screenshottng...');
		const captchaImageSelector = container.resolve('captcha-selector');

		function images(this:CaptchaScreenshot):Promise<ElementHandle<HTMLImageElement>[]> {
			return this.page
			.then((tab:Page) => tab.$$(captchaImageSelector as string))
			.then((res:ElementHandle<HTMLImageElement>[]) => {
				res.forEach((el:ElementHandle<HTMLImageElement>) => {if (!el) throw new Error('Selector not found')});
				return res;
			})
		}

		return images.call(this)
		.then((els:ElementHandle<HTMLImageElement>[]) => {
			const forEachFunction = (elem:ElementHandle<HTMLImageElement>, ind:number) => {
				const boundedEval:Function = screenshotEvalFunction.bind(this, 'output' + ind + '.png');
				// return elem.evaluate(boundedEval)
				return boundedEval(elem);
			}
			return Promise.all(els.map(forEachFunction))
			.then((arr:Promise<Buffer>[]) => Promise.resolve());
		})
	}
}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let cs:CaptchaScreenshot = new CaptchaScreenshot(tab);
Promise.all([cs.makeScreenshot(), br])
.finally(() => ebs.disconnectBrowser())