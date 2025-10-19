import {autoInjectable, inject} from 'tsyringe';
import {ElementHandle} from 'puppeteer';
import {ISelectorFinder} from './ISelectorFinder'
//temp
import {ExistingBrowserSubClass} from '../../BrowserGenerator/ExistingBrowserSubClass';
import { Page, Frame, Browser } from 'puppeteer'
//temp

@autoInjectable()
export class SelectorFinder1<T extends HTMLElement> implements ISelectorFinder {
	
	constructor(
		protected page:Promise<Page|Frame>,
		@inject('selector') protected slctr:string
	) {}

	findElement():Promise<ElementHandle<T>> {
		const wholeFrame:Promise<ElementHandle<T>> = this.page
		.then((tab:Page|Frame) => tab.waitForSelector(this.slctr, {timeout: 5000}))
		.then((el:ElementHandle<T> | null) => {
			if (el) {
				console.log('Selector found');
				return el;
			} else return Promise.reject("Selector found, but hidden")
		})
		return wholeFrame;
	}

	set selector(inp:string) {
		this.slctr = inp;
	}
}

/*let brs = new ExistingBrowserSubClass();
// brs.establishNetServer();
// let brs = new ExistingBrowserSubClass();
const tab = brs.browser
.then((browser:Browser) => browser.pages())
.then(pages => pages[0])

const sf:SelectorFinder1<HTMLFrameElement> = new SelectorFinder1(tab, '#respect-privacy-frame');

const findElement:Promise<ElementHandle<HTMLFrameElement>> = tab
.then(() => sf.findElement());

const contentFrame:Promise<Frame | null> = findElement
.then((elH:ElementHandle<HTMLFrameElement>) => elH.contentFrame())

contentFrame.then((frame:Frame | null) => {
	if (!frame) throw new Error("ContentFrame not found")
	else {
	console.log('ContentFrame found'); 
	return new SelectorFinder1(Promise.resolve(frame), '#save-default-button').findElement()
}})


// contentFrame.catch((err:Error) => console.log('2nd to end catch clause reached:\n', err))

tab.then(() => setTimeout(() => brs.disconnectBrowser(), 10000));*/