import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import {Navigator} from './Navigator';
import {Page} from 'puppeteer';
import fetchCookies from '../BrowserTab/Cookies/CookiesFetcher'

// import config from '../ConfigFiles/vulcan/CookiesPaths'
// import setCookies from '../BrowserTab/Cookies/CookiesSetterProcess'

// let brs = new ExistingBrowserSubClass();

let resolver:Function;

// navigate to url
	// new Navigator(brs.browser
	// 	.then(browser => browser.pages())
	// 	.then(pages => pages[0])
	// ).goToPage('https://www.google.com').then((page:Page) => page.browser().disconnect())

// read cookies from files
	fetchCookies()

// insert cookies (ChildProcess)
	// let cookiesPromise:Promise<void> = new Promise(res => {resolver = res});
	// cookiesPromise.then(() => setCookies(config, resolver))