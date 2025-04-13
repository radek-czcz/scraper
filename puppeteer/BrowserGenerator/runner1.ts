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

let cs:CookiesManager = new CookiesManager(tab);

tab.then((tab:Page) => tab.waitForSelector('#respect-privacy-frame'))
.then((handle:ElementHandle<Element> | null) => {
	if (!handle) throw new Error("Frame not found");
	return handle.contentFrame();
})

.then((frame:Frame | null) => {
	if (!frame) throw new Error("ContentFrame not found");
	return frame.waitForSelector('#save-default-button')
})

.then(() => cs.setCookies('../ConfigFiles/vulcan/'))
.then(async () => {let tab2 = await tab; tab2.reload()})