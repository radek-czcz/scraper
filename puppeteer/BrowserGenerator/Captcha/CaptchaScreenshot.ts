import { Page, ElementHandle } from 'puppeteer';
import {autoInjectable, inject} from 'tsyringe';
import {IScreenshotMethod} from './IScreenshotMethod';
import {container} from '../../vulcanScrapper/Containers/ContinuatorContainer';

@autoInjectable()
export class CaptchaScreenshot {

	constructor(
		private _page:Promise<Page>,
		@inject('captcha-selector') private _selector:string,
		// @inject('captcha-path') private _path:string,
		// @inject('screenshot-function') private screenshotEvalFunction:IScreenshotMethod<Buffer>
	) {}

	private images():Promise<ElementHandle<HTMLImageElement>[]> {
		this._page.then(() => process.stdout.write('Screenshottng...'));
		return this._page
		.then((tab:Page) => tab.$$(this._selector as string))
		.then((res:ElementHandle<HTMLImageElement>[]) => {
			if (res.length === 0) {throw new Error('Selector not found')}
			return res;
		})
	}

	makeScreenshot():Promise<Buffer[]> {
		return this.images()
		.then((els:ElementHandle<HTMLImageElement>[]) => {
			const forEachFunction = (elem:ElementHandle<HTMLImageElement>, ind:number) => {
				// const boundedEval:Function = this.screenshotEvalFunction.bind(this, this._path + 'output' + ind + '.png');
				// return boundedEval(elem);
				// console.log('elem: ', elem);
				container.register('captcha-elHandle', {useValue:elem})
				let screenshotEvalFunction:IScreenshotMethod<Buffer> = container.resolve('screenshot-function');
				// console.log('screenshotEvalFunction: ', screenshotEvalFunction);
				// const boundedEval:Function = screenshotEvalFunction.makeScreenshot;
				// return boundedEval();
				return screenshotEvalFunction.makeScreenshot()
			}
			return Promise.all(els.map(forEachFunction))
		})
	}
}