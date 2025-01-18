import scroll from './puppScroller'
import { Browser, Page } from 'puppeteer'
import { getBrowserFromParentProcess, loadPuppeteer } from './vulcanScrapper/olxScrapper/index';
import {connectToExistingInstance as collectTheData} from './DataCollector'

export function scrollTest():Promise<void|Page> {
	let browser:Browser;

	function reduction(page1:Promise<void>, page2:Page):Promise<void> {
		return page1.then(() => scroll(page2))/*, Promise.resolve()*/;
	}

	return getBrowserFromParentProcess()
	.then((br:Browser) => {browser = br; return br.pages()})
	.then((pages:Page[]) => pages.reduce(reduction, Promise.resolve()))
	.then(() => browser.disconnect())
}

export function nameTest():Promise<void> {
	let browser:Browser;
	return getBrowserFromParentProcess()
	.then((br:Browser) => {browser = br; return br.pages()})
	.then((pages:Page[]) => pages.forEach((inp:Page) => inp.title().then((tit:string) => console.log(tit))))
	.then(() => {setTimeout(() => browser.disconnect(), 2000)});
}

export function collectData():void {
	collectTheData();
}

function getAndExit() {
	loadPuppeteer(true)
	// .then((res:Browser) => res.close())
}





getAndExit();