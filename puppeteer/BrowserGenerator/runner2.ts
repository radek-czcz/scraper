import { Page, Browser, ElementHandle, Frame } from 'puppeteer';
import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import { CookiesManager } from './CookiesManager';
import LoginOperator from './LoginOperator/LoginOperator';
import creds from './LoginOperator/Credentials';
import CaptchaScreenshot from './Captcha/CaptchaScreenshot';

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser;

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let cs:CookiesManager = new CookiesManager(tab)
let lo:LoginOperator = new LoginOperator(tab, creds as [string, string]);

const wholeFrame:Promise<ElementHandle<HTMLFrameElement>> = tab.then((tab:Page) => tab.waitForSelector('#respect-privacy-frame', {timeout: 5000}))
.then((el:ElementHandle<HTMLFrameElement> | null) => {if (el) return el; else throw "Selector not found"})

const contFrame:Promise<Frame | null> = wholeFrame.then((handle:ElementHandle<HTMLFrameElement> | null) => {
	if (!handle) throw "Frame not found"
	else console.log('Frame found'); return handle.contentFrame();
})

const contFrameElem:Promise<ElementHandle<HTMLButtonElement>> = contFrame.then((frame:Frame | null) => {
	if (!frame) throw new Error("ContentFrame not found")
	else {console.log('ContentFrame found'); return frame.waitForSelector('#save-default-button', {timeout: 5000})
		.then((el:ElementHandle<HTMLButtonElement> | null) => {if (el) return el; else throw "Selector not found"})
		// .catch(() => {throw "Element in ContentFrame not awaited"})
	}	
})

//catch below causes the flow to return at 'finally'. If error is rethrown then flow jumps to next catch
contFrameElem.catch((err:Error) => console.log('2nd to end catch clause reached:\n', err))

.finally(() => cs.setCookies('../ConfigFiles/vulcan/'))
.then(async () => {
	console.log('cookies inserted');
	let tab2 = await tab; console.log('reloading...');
	return tab2.reload({waitUntil:'networkidle2'})
	.then(() => tab2.waitForSelector('a.extra-button.extra-button-gray', {timeout: 7000}));
})
.then(() => tab.then((tab1:Page) => {console.log('clicking button');
	const clickButton = tab1.click('a.extra-button.extra-button-gray'); 
	return clickButton.then(() => tab1.waitForSelector('#Login', {timeout: 5000}))
}))

.then(() => lo.writeLogin('input#Login'))
.then(() => lo.clickNext('button#btNext'))

.catch((err:Error) => console.log('Last catch clause reached:\n', err))
.finally(() => ebs.disconnectBrowser())
