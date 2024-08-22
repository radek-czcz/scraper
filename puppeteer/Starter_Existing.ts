import {Browser, Page} from 'puppeteer';
import cookiesConfig from './ConfigFiles/CookiesConfig';
import {urlArr, ISitesAndCategories} from './ConfigFiles/categories'
import {connectToExistingInstance as collectTheData} from './DataCollector'
import getBrowser from './BrowserGenerator';

let config = cookiesConfig/*()*/;

let browser: Browser;
let page:Promise<Page>[];
// urls to olx pages
	let arrUrl:string[] = [];
	urlArr.forEach((inp:ISitesAndCategories) => arrUrl.push(inp.url));
	// arrUrl.push(urlArr[0].url)

// reaction to ctrl+c
	// process.on('SIGINT', function() {
	//     console.log("Caught interrupt signal");
	//     allTabs.then((res:Page[]) => res[0].browser().disconnect())
	//     // browser.disconnect();
	//     process.exit(0);
	// });

function run() {
	// get existing or start new Browser
		let brow1:Promise<Browser> = getBrowser(browser);

	// catcher
		// .then(res => setTimeout(() => res.browser().disconnect(), 10))
		// tab1.catch(err => {console.log(err); browser.disconnect()});
		// goToPages.catch(err => {console.log(err); browser.disconnect()});

	// collect data (DataCollector)
		let dataCollect = brow1.then(() => collectTheData())
}

run();