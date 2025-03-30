import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import {Browser, Page} from 'puppeteer';
import CaptchaScreenshot from './Captcha/CaptchaScreenshot';
import GenderReader from './Captcha/GenderReader';
import RequestSender from './Captcha/RequestSender';
import NamesFileReader from './Captcha/NamesFileReader';



const ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();
const br:Promise<Browser> = ebs.browser

const tab:Promise<Page> = br
	.then((browser:Browser) => browser.pages())
	.then((tabs:Page[]) => tabs[0]);

const cs:CaptchaScreenshot = new CaptchaScreenshot(tab);

const screenshot = cs.makeScreenshot();
const gender = new GenderReader(tab).gender

disconnectBrowser()

// .then((res:string) => {console.log(res); return res});

// let fileGender:Promise<string[]> = NamesFileReader.readFile(gender)
// .then((res:string[]) => console.log(res))
// .then(() => disconnectBrowser())

function disconnectBrowser() {
	br.then((res:Browser) => res.disconnect());
}

// rs.solveCaptcha().then((res:string|undefined) => {console.log(res); disconnectBrowser()})
// .catch(err => {console.log(err); disconnectBrowser()})



// Promise.all([cs.readGender(), br])
// .then((arr:[string, Browser]) => {
// 	console.log(strRep(arr[0]));
// 	arr[1].disconnect();
// })

Promise.all([screenshot, gender]).then(disconnectBrowser);