import {loadPage, /*loadPuppeteer,*/ loadPages} from './vulcanScrapper/puppLoader';
import {Browser, Page} from 'puppeteer';
import cookiesConfig from './ConfigFiles/CookiesConfig';
import {urlArr, ISitesAndCategories} from './ConfigFiles/categories'
import scroll from './puppScroller'
import {connectToExistingInstance as collectTheData} from './DataCollector'
import allTabs from './BrowserTab'
import {setCookies, saveCookies} from './BrowserTab'
// import getBrowser from './BrowserGenerator';

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let config = cookiesConfig;

let browser: Browser;
let page:Promise<Page>[];
// URLS TO OLX PAGES
	let arrUrl:string[] = [];
	urlArr.forEach((inp:ISitesAndCategories) => arrUrl.push(inp.url));
	// arrUrl.push(urlArr[0].url)

// REACTION TO CTRL+C
	process.on('SIGINT', function() {
	    console.log("Caught interrupt signal");
	    allTabs.then((res:Page[]) => res[0].browser().disconnect())
	    // browser.disconnect();
	    process.exit(0);
	});

function run() {
	// SOME VARIABLES INITIALIZATIONS
		let resolver:Function;
		let cookiesPromise: Promise<void> = new Promise(res => {resolver = res});
		
	// GET EXISTING OR START NEW BROWSER
		// let brow1:Promise<Browser> = getBrowser(browser);
		// let brow1:Promise<Browser> = loadPuppeteer(false)
		// .then((res:Browser) => {browser = res; return browser})

	// CREATE NEW TAB OR TAKE EXISTING TO OPERATE ON
		// function newTabs():Promise<Page>[] {return arrUrl.slice(0, arrUrl.length - 1).map((url:string) => brow1.then((res:Browser) => res.newPage()))};
		// let tabs:Promise<Page[]> = brow1.then(() => Promise.all([...newTabs()]))
		let tabs = allTabs;

	// SET COOKIES ON BROWSER
		tabs.then(() => setCookies(resolver))

	// GO TO DESIRED PAGE
		let goToPages:Promise<Page[]> = cookiesPromise.then(() => loadPages(arrUrl))

	// SAVE COOKIES 
		let getCookies:Promise<void> = goToPages.then(() => {setTimeout(() => saveCookies(), 10000)})

	// CATCHER
		// .then(res => setTimeout(() => res.browser().disconnect(), 10))
		// tab1.catch(err => {console.log(err); browser.disconnect()});
		// goToPages.catch(err => {console.log(err); browser.disconnect()});

	// SCROLL-REDUCTION FUNCTION
		function scrollReduction(page1:Promise<void>, page2:Page):Promise<void> {
			return page1.then(() => scroll(page2))
		}

	// SCROLLING (PUPPSCROLLER)
		let scrollAll:Promise<void> = goToPages.then((pages2:Page[]) => pages2.reduce(scrollReduction, Promise.resolve()));

	// COLLECT DATA (DATACOLLECTOR)
		let dataCollect = scrollAll.then(() => collectTheData())
}

run();