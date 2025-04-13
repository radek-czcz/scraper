import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import {Browser, Page} from 'puppeteer';
import CaptchaScreenshot from './Captcha/CaptchaScreenshot';
import GenderReader, {Gender} from './Captcha/GenderReader';
import RequestSender from './Captcha/RequestSender';
import NamesFileReader from './Captcha/NamesFileReader';



const ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();
const br:Promise<Browser> = ebs.browser

const tab:Promise<Page> = br
	.then((browser:Browser) => browser.pages())
	.then((tabs:Page[]) => tabs[0]);

const cs:CaptchaScreenshot = new CaptchaScreenshot(tab);

const screenshot = cs.makeScreenshot();
const genderReader = new GenderReader(tab)

const gender:Promise<Gender> = genderReader.gender.then((res:Gender) => {console.log(res); return res})

const names:Promise<void | string[]> = NamesFileReader.readFile(gender)
.then((res:string[]|void) => console.log(res));

const reqSender:RequestSender = new RequestSender(screenshot, gender);
const solvedCaptcha:Promise<void> = reqSender.sendRequest()
.then((res:{}) => console.log(res))
.catch((err:Error) => {console.log(err); disconnectBrowser()});

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