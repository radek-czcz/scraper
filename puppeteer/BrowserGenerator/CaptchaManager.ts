import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import {Browser, Page} from 'puppeteer';
import CaptchaScreenshot from './Captcha/CaptchaScreenshot';
import GenderReader, {Gender} from './Captcha/GenderReader';
import RequestSender from './Captcha/RequestSender';
import NamesFileReader from './Captcha/NamesFileReader';
import {readFile} from 'node:fs/promises'

export class CaptchaManager {

	private tab:Promise<Page>;

	constructor(tab:Promise<Page>) {
		this.tab = tab;
	}

	/*private*/ takeScreenshot():Promise<void> {
		const cs:CaptchaScreenshot = new CaptchaScreenshot(tab);
		return cs.makeScreenshot();
	}

	/*private resolveIfSelectorUnavailable():Promise<void> {
		return this.takeScreenshot()
		.catch((err:Error) => {if (err.message === 'Selector not found') {console.log('error checked'); return Promise.reject()}})
	}*/

	/*private*/ readGender():Promise<Gender> {
		const genderReader = new GenderReader(tab);
		return genderReader.gender
	}

	/*private*/ readNamesFile():Promise<string[]> {
		const names:Promise<string[]> = NamesFileReader.readFile(this.readGender());
		return names;
	}

	/*private*/ receiveAndProcessResponse():Promise<string> {
			
		const arrayOfRequests:RequestSender[] = [];

		let nth = 0;
		while ( nth < 2) {
			 arrayOfRequests.push(new RequestSender(readFile(`./output${nth}.png`, "base64"), this.readGender()));
			 nth++
		}

		function shiftedValue():RequestSender {
			let returnValue:RequestSender|undefined = arrayOfRequests.shift();
			if (returnValue) return returnValue
			else throw new Error('array empty')
		}

		function finder(inp:{data:string}):Promise<string> {

			function findFunction(elem:string):boolean {
				return inp.data.toLowerCase().includes(elem.toLowerCase())
			}

			function truthyResult(namesGendered:string[]) {
				const result:string|undefined = namesGendered.find(findFunction)
				if (result) return inp.data
				else throw new Error('Name not found in list')
			}

			return names.then(truthyResult);
		}

		function reduceCallback(acc:Promise<string>, cur:RequestSender):Promise<string> {
			return acc
			.then(
				(res:string) => res,
				() => cur.sendRequest().then((res:{data:string}) => {console.log('2nd: ', res.data);return finder(res)}),
			)
		}

		const firstFromRequests:Promise<string> = shiftedValue().sendRequest().then((res:{data:string}) => {console.log('1st: ', res.data);return finder(res)})

		const reduced:Promise<string> = arrayOfRequests.reduce<Promise<string>>(reduceCallback, firstFromRequests)

		return reduced;
	}

	/*private*/ writeCaptchaAndCatch():Promise<string|void> {
		const writeCaptcha = async (res:string) => {
			console.log('result print', res);
			let page = await this.tab;
			const selector = '#captchaUser'
			page.waitForSelector(selector)
			.then(() => console.log('(Login input-box)'));
			const waitForWriting:void = await page.type(selector, res, {delay: 100})
			return waitForWriting;
		}

		const log:Promise<string|void> = this.receiveAndProcessResponse().then(writeCaptcha)
		log.catch((err:Error) => {console.log('catch: ',err)/*; ebs.disconnectBrowser()*/})
		return log;
	}

}

const ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();
const br:Promise<Browser> = ebs.browser

const tab:Promise<Page> = br
	.then((browser:Browser) => browser.pages())
	.then((tabs:Page[]) => tabs[0]);

const cm = new CaptchaManager(tab);
const screens:Promise<void> = cm.takeScreenshot();

const screens2:Promise<void> = screens.then((inp:void) => Promise.reject(), (err:Error) => {if (err.message === 'Selector not found') {console.log('No need to write captcha'); return Promise.resolve()}})
// const gender:Promise<Gender> = screens.then(() => cm.readGender());
const names:Promise<string[]> = screens.then(() => cm.readNamesFile());
// const response:Promise<string> = screens.then((v:void) => cm.receiveAndProcessResponse());
const writeAndCatch:Promise<string|void> = screens.then(() => cm.writeCaptchaAndCatch());
writeAndCatch.finally(() => ebs.disconnectBrowser())

Promise.any([screens2, writeAndCatch]).then((res:string|void) => console.log('last log: ',res))


// const cs:CaptchaScreenshot = new CaptchaScreenshot(tab);

// const screenshot = cs.makeScreenshot();

// const genderReader = new GenderReader(tab)

// const gender:Promise<Gender> = genderReader.gender

// const names:Promise<string[]> = NamesFileReader.readFile(gender)

// const log = names.then(res => console.log(res));

// const response:Promise<string> = names.then(() => {
	
// 	const arrayOfRequests:RequestSender[] = [];

// 	let nth = 0;
// 	while ( nth < 2) {
// 		 arrayOfRequests.push(new RequestSender(readFile(`./output${nth}.png`, "base64"), gender));
// 		 nth++
// 	}

// 	function shiftedValue():RequestSender {
// 		let returnValue:RequestSender|undefined = arrayOfRequests.shift();
// 		if (returnValue) return returnValue
// 		else throw new Error('array empty')
// 	}

// 	function finder(inp:{data:string}):Promise<string> {

// 		function findFunction(elem:string):boolean {
// 			return inp.data.toLowerCase().includes(elem.toLowerCase())
// 		}

// 		function truthyResult(namesGendered:string[]) {
// 			const result:string|undefined = namesGendered.find(findFunction)
// 			if (result) return inp.data
// 			else throw new Error('Name not found in list')
// 		}

// 		return names.then(truthyResult);
// 	}

// 	function reduceCallback(acc:Promise<string>, cur:RequestSender):Promise<string> {
// 		return acc
// 		.then(
// 			(res:string) => res,
// 			() => cur.sendRequest().then((res:{data:string}) => {console.log('2nd: ', res.data);return finder(res)}),
// 		)
// 	}

// 	const firstFromRequests:Promise<string> = shiftedValue().sendRequest().then((res:{data:string}) => {console.log('1st: ', res.data);return finder(res)})

// 	const reduced:Promise<string> = arrayOfRequests.reduce<Promise<string>>(reduceCallback, firstFromRequests)

// 	return reduced;

// })

// .then((res:string) => {console.log('result print', res); return res})

// Promise.all([screenshot, response, gender, names]).catch((err:Error) => {console.log('catch: ',err)})

// .finally(() => ebs.disconnectBrowser());