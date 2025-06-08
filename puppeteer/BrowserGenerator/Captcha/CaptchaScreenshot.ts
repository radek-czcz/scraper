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
		process.stdout.write('Screenshottng...');
		const captchaImageSelector = container.resolve('captcha-selector');

		function image(this:CaptchaScreenshot)/*const captchaContainer*/:Promise<ElementHandle<HTMLImageElement>> {
			return this.page
			.then((tab:Page) => tab.$(captchaImageSelector as string))
			.then((res:ElementHandle<HTMLImageElement>|null) => {
				if (!res) throw new Error('Selector not found')
				else return res;
			})
		}

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
			return els.forEach(forEachFunction)
		})



		// images.call(this).then((els:ElementHandle<HTMLImageElement>[]) => els[0]).then(screenshotEvalFunction.bind(this, 'output1.png'));
		// return images.call(this).then((els:ElementHandle<HTMLImageElement>[]) => els[1]).then(screenshotEvalFunction.bind(this, 'output2.png'));

		// const sShot = captchaContainer.then(screenshotEvalFunction.bind(this, 'output1.png'));
		// sShot.then(() => console.log('done'));
		
		// return sShot;
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