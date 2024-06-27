import { spawn, ChildProcess } from 'node:child_process';
import attachFunc from './vulcanScrapper/ProcessListenersManager';
import {loadPage, loadPuppeteer, getPage, getPu, getBrowserFromParentProcess, loadPages} from './vulcanScrapper/puppLoader';
import {Browser, Page} from 'puppeteer';
import cookiesConfig from './ConfigFiles/CookiesConfig';
import {urlArr, ISitesAndCategories} from './ConfigFiles/categories'
import scroll from './puppScroller'
import {connectToExistingInstance as collectTheData} from './DataCollector'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser: Browser;
let page:Promise<Page>[];
let childProcessWriteDataToDB;
// urls fo olx pages
	let arrUrl:string[] = [];
	urlArr.forEach((inp:ISitesAndCategories) => arrUrl.push(inp.url));
	// arrUrl.push(urlArr[4].url)

// reaction to ctrl+c
	process.on('SIGINT', function() {
	    console.log("Caught interrupt signal");
	    browser.disconnect();
	    process.exit(0);
	});

function run() {
	// some variables initializations
		let resolver:Function;
		let cookiesPromise: Promise<void> = new Promise(res => {resolver = res});
		
	// or start new Browser
		let brow1:Promise<Browser> = loadPuppeteer(false)
		.then((res:Browser) => {browser = res; return browser})

	// create new tab or take existing to operate on
		function newTabs():Promise<Page>[] {return arrUrl.slice(0, arrUrl.length - 1).map((url:string) => browser.newPage())};
		let tabs:Promise<Page[]> = brow1.then(() => Promise.all([...newTabs()]))

	// set cookies on browser
		let cookiesSet = tabs.then(() => {
			let processToSetCookies:ChildProcess;
			processToSetCookies = spawn('ts-node', [cookiesConfig.setterRelativePath, 'path='+cookiesConfig.pathToCookies],{shell: true});
			let name1 = 'Cookies setting';
			attachFunc({
				processObject: processToSetCookies,
				name: name1,
				onData: function(data:string) {
					if ( data.toString().includes('cookies set') ) {
						console.log('resolving');
						resolver();
					}
					console.log(`Process of ${name1} produced output:\n  ${data}`);
				}
			})
		})

	// go to desired page
		let goToPages:Promise<Page[]> = cookiesPromise.then(() => loadPages(arrUrl))

	// save cookies 
		// let getCookies:Promise<void> = goToPages.then(() => {setTimeout(() => saveCookies(), 10000)})

	// catcher
		// .then(res => setTimeout(() => res.browser().disconnect(), 10))
		// tab1.catch(err => {console.log(err); browser.disconnect()});
		// getCookies.catch(err => {console.log(err); browser.disconnect()});

	// scroll-reduction function
		// function scrollReduction(page1:Promise<void>, page2:Page):Promise<void> {
		// 	return page1.then(() => scroll(page2))/*, Promise.resolve()*/;
		// }

	// scrolling (puppScroller)
		// let scrollAll:Promise<void> = goToPages.then((pages2:Page[]) => pages2.reduce(scrollReduction, Promise.resolve()));

	// collect data (DataCollector)
		// let dataCollect = scrollAll.then(() => collectTheData())

}

function saveCookies(res: void):void {
	let processOfSavingCookies;
	processOfSavingCookies = spawn('ts-node', [
		// Relative path to fetcher's module's file
		cookiesConfig.fetcherRelativePath, 
		'cookiesPath='+cookiesConfig.pathToCookies
	], {shell: true})
	let name1 = 'fetching cookies';
	attachFunc({
		processObject: processOfSavingCookies,
		name: name1,
	})
}

async function getTabToOperateOn(res: Browser):Promise<Page> {
	// console.log('Getting tab to operate');
	// let tabs:Page[] = await browser.pages();
	// let tab:Page = tabs[tabs.length-1];
	// let title:string = await tab.title();
	// if (title === "") {
	// 	console.log('Getting existing tab');
	// 	page = Promise.resolve(tab)
	// 	return page;
	// } else {
	// 	page = browser.newPage();
	// 	page.then(() => {console.log('New tab created')});
	// 	return page
	// }

	// take opened olx page
		console.log('Getting tab to operate');
		let tabs:Page[] = await browser.pages();
		return Promise.resolve(tabs[tabs.length-1]);
}

run();