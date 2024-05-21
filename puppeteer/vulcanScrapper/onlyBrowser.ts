import { Browser, Page } from 'puppeteer';
import { loadPuppeteer, loadPage } from './puppLoader';
import { spawn } from 'child_process';
import getTime from './RandomTimeInterval.js'
import attachFunc from './ProcessListenersManager.js'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser: Promise<Browser>;
let page: Page;

function loadBrowserAndPage(): void {

	browser = loadPuppeteer(false);
	let resolver: Function;
	let cookiesPromise: Promise<void> = new Promise(res => {resolver = res});

	let cookiesSet = browser.then(() => {
		let processToSetCookies;
		processToSetCookies = spawn('ts-node', ['CookiesSetter.ts'],{shell: true});
		let name1 = 'Cookies setting';
		attachFunc({
			processObject: processToSetCookies,
			name: name1,
			onData: function(data: string) {
				if ( data.toString() === 'cookies set' ) {
					resolver();
				}
				console.log(`Process of ${name1} produced output:\n  ${data}`);
			}
		})
	})

	Promise.all([cookiesPromise, cookiesSet]).then(goToPage, onError)
	// page = browser.then(goToPage)
}

function goToPage(res: void[]): Page {
	return loadPage('https://uonetplus.vulcan.net.pl/gminawolow');
}

function onError(err: Error): void {
	if (err) {console.dir(err)}
}

loadBrowserAndPage();