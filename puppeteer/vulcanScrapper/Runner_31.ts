import "reflect-metadata";
import {autoInjectable, Lifecycle} from 'tsyringe';
import {container} from './Containers/ContinuatorContainer';
import {Registrator} from './Registrator';
import {Page} from 'puppeteer';
import {ExistingBrowserSubClass} from '../BrowserGenerator/ExistingBrowserSubClass';
import GenderReader, {Gender} from '../BrowserGenerator/Captcha/GenderReader';
import {Continuator} from './Continuator';
import {CaptchaScreenshot} from '../BrowserGenerator/Captcha/CaptchaScreenshot'

// @injectable()
@autoInjectable()
class ContinuatorHere<T> extends Continuator<T> {
	constructor(
		private registrator:Registrator,
		protected _existing:ExistingBrowserSubClass,
		private _genderReader:GenderReader,
		private _cs:CaptchaScreenshot
	) {super(_existing)}

	get genderReader() {
		return this._genderReader;
	}
	get cs() {
		return this._cs;
	}
}

container.register(Continuator, {useClass:ContinuatorHere}, {lifecycle: Lifecycle.Singleton}) 
const continuator:ContinuatorHere<Page> = container.resolve(Continuator) as ContinuatorHere<Page>;

continuator.resume()
.then(() => continuator.genderReader.gender)
.then((gender:Gender) => console.log(gender))

.then(() => continuator.cs.makeScreenshot())

.then(() => continuator.existing.disconnectBrowser())