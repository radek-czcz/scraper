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

const namesArray:Promise<string[]> = readNamesFromFile();

function consumeRequest(response:{data:string}):Promise<boolean> {
	// return console.log(response.data)
	return namesArray
	.then((namesArray:string[]) => {
		namesArray.forEach((name:string) => {
			if (response.data.includes(name.toLowerCase()))
				{console.log('name '+name+' found in array')
				return true}
			else return false
		})
		console.log('name '+response.data+' not found in array');
		return false;
	})
}


const screens = makeScreenshots();

function loopOverScreens() {
	return screens.then((screens:Buffer[]) => screens.reduce((acc:Promise<boolean>, cur:Buffer) => {
		// if (acc) {return acc.then(consumeRequest)}
		// registerScreenshot(cur);
		// return sendRequest()
		// .then(consumeRequest)

		return acc.then(
			(b:boolean) => {console.log('normal branch');
				if (!b) {
					registerScreenshot(cur);
					return sendRequest()
					.then(consumeRequest)
				} else return false
			}
		);
	}, Promise.resolve(false)))
}





// namesArray
// .then((namesArray:string[]) => {
// 	namesArray.forEach((name:string) => {
// 		if ('patryk90002'.includes(name.toLowerCase()))
// 			{console.log(name)}
// 	}) 
// })

loopOverScreens()
/*sendRequest*/.then(() => continuator.existing.disconnectBrowser())