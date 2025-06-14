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

const screenshot = cs.makeScreenshot();

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
	}

	function finder(inp:{data:string}) {
		if (inp) {}
	}

	function reduceCallb(acc:RequestSender, cur:RequestSender):Promise<string> {
		return acc.sendRequest()
		.then(
			(res:{data:string}) => res.data
		)
	}

	const reduced:Promise<string> = arrayOfRequests.reduce(reduceCallb, arrayOfRequests.shift())

})

.then((res:string) => {console.log('result print', res); return res})

Promise.all([screenshot, response, gender, names]).catch((err:Error) => {console.log('catch: ',err)/*; ebs.disconnectBrowser()*/})

.finally(() => ebs.disconnectBrowser());