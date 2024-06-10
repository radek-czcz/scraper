import { spawn, ChildProcess } from 'node:child_process';
// import { loadPage, loadPuppeteer, getPage, attachFunc, getPu, getBrowserFromParentProcess } from './index'
import attachFunc from '../ProcessListenersManager'
import {loadPage, loadPuppeteer, getPage, getPu, getBrowserFromParentProcess} from '../puppLoader'
import {Browser, Page} from 'puppeteer'
import {timingFunctions} from './index'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser: Browser;
let page:Promise<Page>;
let childProcessWriteDataToDB;
// urls fo olx pages
	// avensis
		let url1 = 'https://www.olx.pl/motoryzacja/samochody/toyota/q-avensis/?search%5Border%5D=created_at:desc&search%5Bfilter_float_year:from%5D=2006&search%5Bfilter_float_year:to%5D=2008&search%5Bfilter_float_enginesize:to%5D=1900&search%5Bfilter_enum_petrol%5D%5B0%5D=petrol&search%5Bfilter_enum_petrol%5D%5B1%5D=lpg&search%5Bfilter_enum_car_body%5D%5B0%5D=estate-car&search%5Bfilter_float_milage:to%5D=200000';
	// insignia		
		// let url1 = 'https://www.olx.pl/motoryzacja/samochody/opel/?search%5Bfilter_float_price:to%5D=30000&search%5Bfilter_enum_model%5D%5B0%5D=insignia&search%5Bfilter_enum_petrol%5D%5B0%5D=petrol&search%5Bfilter_enum_car_body%5D%5B0%5D=estate-car&search%5Bfilter_float_milage:to%5D=200000';
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

	// get browser from existing session 
		let brow1:Promise<Browser> = getBrowserFromParentProcess()
		// let brow1:Promise<Browser> = getPu();
		
	// or start new Browser
		// let brow1:Promise<Browser> = loadPuppeteer(false)
		.then(res => new Promise<Browser>(res1 => {browser = res; res1(res)}))

	// create new tab or take existing to operate on
		let tab1:Promise<Page> = brow1.then(getTabToOperateOn)

	// set cookies on browser
		/*let cookiesSet = tab1.then(() => {
			let processToSetCookies:ChildProcess;
			processToSetCookies = spawn('ts-node', ['../CookiesSetter.ts', 'path=./cookies.json'],{shell: true});
			let name1 = 'Cookies setting';
			attachFunc({
				processObject: processToSetCookies,
				name: name1,
				onData: function(data:string) {
					if ( data.toString() === 'cookies set' ) {
						resolver();
					}
					console.log(`Process of ${name1} produced output:\n  ${data}`);
				}
			})
		})*/

	// go to desired page
		let openedPage:Promise<Page> = Promise.all([tab1/*, cookiesSet, cookiesPromise*/]).then(res => {
			console.log('Opening page');
			res[0].goto(url1, { waitUntil: 'domcontentloaded' });
			return res[0];
		})

	// save cookies
		let getCookies = openedPage.then((page:Page) => saveCookies())

	// catcher
		// .then(res => setTimeout(() => res.browser().disconnect(), 10))
		openedPage.catch(err => {console.log(err); browser.disconnect()});

	// timing functions
		openedPage.then(() => timingFunctions());

}

function saveCookies(res: void) {
		let processOfSavingCookies;
		processOfSavingCookies = spawn('ts-node', ['../CookiesFetcher.ts'], {shell: true})
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