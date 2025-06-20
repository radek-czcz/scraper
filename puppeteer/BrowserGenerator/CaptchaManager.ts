import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import {Browser, Page} from 'puppeteer';
import CaptchaScreenshot from './Captcha/CaptchaScreenshot';
import GenderReader, {Gender} from './Captcha/GenderReader';
import RequestSender from './Captcha/RequestSender';
import NamesFileReader from './Captcha/NamesFileReader';
import {readFile} from 'node:fs/promises'

const ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();
const br:Promise<Browser> = ebs.browser

const tab:Promise<Page> = br
	.then((browser:Browser) => browser.pages())
	.then((tabs:Page[]) => tabs[0]);

const cs:CaptchaScreenshot = new CaptchaScreenshot(tab);

// const screenshot = cs.makeScreenshot();

const genderReader = new GenderReader(tab)

const gender:Promise<Gender> = genderReader.gender

const names:Promise<string[]> = NamesFileReader.readFile(gender)

const log = names.then(res => console.log(res));

const response:Promise<string> = names.then((/*res:string[]|void*/) => {
	// console.log(res);
	
	const arrayOfRequests:RequestSender[] = [];

	let nth = 0;
	while ( nth < 2) {
		 arrayOfRequests.push(new RequestSender(readFile(`./output${nth}.png`, "base64"), gender));
		 nth++
	}

	function shiftedValue():RequestSender {
		let returnValue:RequestSender|undefined = arrayOfRequests.shift();
		if (returnValue) return returnValue
		else throw new Error('array empty')
	}

	function finder(inp:{data:string}):Promise<string> {

		function check(elem:string):boolean {
			return inp.data.toLowerCase().includes(elem.toLowerCase())
		}

		function truthyResult(namesGendered:string[]) {
			const result:string|undefined = namesGendered.find(check)
			if (result) return inp.data
			else throw new Error('Name not found in list')
		}

		return names.then(truthyResult)
	}

	function reduceCallback(acc:Promise<string>, cur:RequestSender):Promise<string> {
		return acc
		.then(
			(res:string) => res,
			() => cur.sendRequest().then((res:{data:string}) => {console.log('2nd: ', res.data);return finder(res)}),
		)
	}

	const reduced:Promise<string> = arrayOfRequests.reduce<Promise<string>>(reduceCallback, shiftedValue().sendRequest().then((res:{data:string}) => {console.log('1st: ', res.data);return finder(res)}))

	return reduced;

})

.then((res:string) => {console.log('result print', res); return res})

Promise.all([/*screenshot,*/ response, gender, names]).catch((err:Error) => {console.log('catch: ',err)/*; ebs.disconnectBrowser()*/})

.finally(() => ebs.disconnectBrowser());