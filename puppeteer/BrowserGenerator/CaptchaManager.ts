import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import {Browser, Page} from 'puppeteer';
import CaptchaScreenshot from './Captcha/CaptchaScreenshot';
import GenderReader from './Captcha/GenderReader';
import RequestSender from './Captcha/RequestSender';



const ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();
const br:Promise<Browser> = ebs.browser

const tab:Promise<Page> = br
	.then((browser:Browser) => browser.pages())
	.then((tabs:Page[]) => tabs[0]);

const cs:CaptchaScreenshot = new CaptchaScreenshot(tab);
const gr:GenderReader = new GenderReader(tab);

const screenshot = cs.makeScreenshot();
const gender = gr.readGender();

const rs:RequestSender = new RequestSender(screenshot, gender);

function strRep(inp:string):string[] {
	return inp.replaceAll(`"`, '').replaceAll(",", '').split('\n')
}

rs.solveCaptcha().then((res:string|undefined) => console.log(res))
.catch(err => {console.log(err); br.then((res:Browser) => res.disconnect())})

// Promise.all([cs.readGender(), br])
// .then((arr:[string, Browser]) => {
// 	console.log(strRep(arr[0]));
// 	arr[1].disconnect();
// })