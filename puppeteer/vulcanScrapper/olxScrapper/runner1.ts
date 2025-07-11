import {BrowserSubClass} from './BrowserSubClass';
import {Navigator} from './Navigator';
import { CookiesManager } from './CookiesManager'
import { Page, Frame, ElementHandle } from 'puppeteer'

let brs = new BrowserSubClass();

brs.establishNetServer();

const tab = new Navigator(brs.browser
	.then(browser => browser.pages())
	.then(pages => pages[0])
).goToPage('https://dziennik-uczen.vulcan.net.pl/gminawolow')

// let cs:CookiesManager = new CookiesManager(tab);

// tab.then((tab:Page) => tab.waitForSelector('#respect-privacy-frame1', {timeout: 5000}))
// .catch(err => {console.log('selector not found'); throw 'selector not found'})

// .then((handle:ElementHandle<Element> | null) => {
// 	console.log('handle: \n', handle);
// 	if (!handle) throw new Error("Frame not found")
// 	else return handle.contentFrame();
// }, (err:Error) => {throw 'Frame not found'})

// .then((frame:Frame | null) => {
// 	if (!frame) throw new Error("ContentFrame not found");
// 	return frame.waitForSelector('#save-default-button')
// }, (err:Error) => {throw 'ContentFrame not found'})

// .then(() => cs.setCookies('../ConfigFiles/vulcan/'))
// .then(async () => {let tab2 = await tab; tab2.reload()})