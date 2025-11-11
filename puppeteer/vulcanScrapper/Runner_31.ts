import "reflect-metadata";
import {autoInjectable, Lifecycle} from 'tsyringe';
import {container} from './Containers/ContinuatorContainer';
import {Registrator} from './Registrator';
import {Page} from 'puppeteer';
import {ExistingBrowserSubClass} from '../BrowserGenerator/ExistingBrowserSubClass';
import GenderReader, {Gender} from '../BrowserGenerator/Captcha/GenderReader';
import {Continuator} from './Continuator';
import {CaptchaScreenshot} from '../BrowserGenerator/Captcha/CaptchaScreenshot';
import RequestSender from '../BrowserGenerator/Captcha/RequestSender';
import {NamesFileReader} from '../BrowserGenerator/Captcha/NamesFileReader';

@autoInjectable()
class ContinuatorHere<T> extends Continuator<T> {
	constructor(
		private registrator:Registrator,
		protected _existing:ExistingBrowserSubClass,
		private _cs:CaptchaScreenshot,
		private _namesFileReader:NamesFileReader
	) {super(_existing)}

	get cs() {
		return this._cs;
	}

	get namesFileReader() {
		return this._namesFileReader;
	}
}

container.register(Continuator, {useClass:ContinuatorHere}, {lifecycle: Lifecycle.Singleton}) 
const continuator:ContinuatorHere<Page> = container.resolve(Continuator) as ContinuatorHere<Page>;

const pageContinuator:Promise<Page> = continuator.resume()

function makeScreenshots():Promise<Buffer[]> {
	return pageContinuator.then(() => continuator.cs.makeScreenshot());
}

function registerScreenshot(buf:Buffer) {
	return container.register('captcha-image', {useValue:Promise.resolve(buf)})
}

// function registerScreenshotToBind(num:string, buf:Buffer[]) {
// 	console.log(num);
// 	return container.register('captcha-image', {useValue:Promise.resolve(buf[0])});
// }

// let registerScreenshot = registerScreenshotToBind.bind(this, '2');

function readNamesFromFile():Promise<string[]> {
	return continuator.namesFileReader.readFile();
}

function sendRequest():Promise<{data:string}> {
	return container.resolve(RequestSender).sendRequest()
}

function consumeRequest(response:{data:string}):void {
	return console.log(response.data)
}

const namesArray:Promise<string[]> = readNamesFromFile();

const screens = makeScreenshots();

function loopOverScreens() {
	return screens.then((screens:Buffer[]) => screens.reduce((acc:Promise<boolean>, cur:Buffer) => {
		// if (acc) {return acc.then(consumeRequest)}
		// registerScreenshot(cur);
		// sendRequest()
		// .then(consumeRequest)

		return acc.then((boo:boolean) => boo);
	}, Promise.resolve(false)))
}





// namesArray
// .then((namesArray:string[]) => {
// 	namesArray.forEach((name:string) => {
// 		if ('patryk90002'.includes(name.toLowerCase()))
// 			{console.log(name)}
// 	}) 
// })*/

loopOverScreens()
/*sendRequest*/.then(() => continuator.existing.disconnectBrowser())