import { loadPuppeteer, loadPage } from './puppLoader.js';
import { spawn, ChildProcess } from 'child_process';
import getTime from './RandomTimeInterval.js'
import attachFunc from './ProcessListenersManager.js'
import {Browser, Page, ElementHandle} from 'puppeteer'
import process from 'node:process'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser: Promise<Browser>;
let page:Promise<Page>;
const loginButtonSelector:string = 'a.loginButtonDziennikVulcan';
let processOfFetchAndWrite:typeof process

process.stdin.on('data', data => {
	if (data.toString() === "close test11") {
		processOfFetchAndWrite.stdout.on('data', data => {
			console.log(data);
		})
		processOfFetchAndWrite.stdin.write(data);
	}
})

function loadBrowserAndPage() {
	const date1:Date = new Date('April 25, 2024 20:17:00');
	let now:Date = new Date();
	let waittime:number|typeof NaN = date1.getTime() - now.getTime();

	browser = loadPuppeteer(false);
	let resolver:Function;
	let cookiesPromise:Promise<void> = new Promise(res => {resolver = res});

	let cookiesSet:Promise<void> = browser.then(() => {
		let processToSetCookies:ChildProcess;
		processToSetCookies = spawn('npx', ['babel-node', 'CookiesSetterRunner'],{shell: true});
		let name1:string = 'Cookies setting';
		attachFunc({
			processObject: processToSetCookies,
			name: name1,
			onData: function(data:Buffer) {
				if ( data.toString() === 'cookies set' ) {
					resolver();
				}
				console.log(`Process of ${name1} produced output:\n  ${data}`);
			}
		})
	})

	page = Promise.all([cookiesPromise, cookiesSet]).then(goToPage)
	.catch((err:Error) => {console.log(err); throw err})

	let logging:Promise<Promise<void>> = page.then(logOrFetchData);

	let gettingCookies:Promise<void> = logging.then(res => {
		// if (res === 'continue after login') {
			saveCookies();
		// }
	})

	let fetchingData = logging.then(res => {
		console.log('from fetching');
		return fetchData();
	});
}

function clickLogin():Promise<Promise<void>> {
	return page.then(async (res:Page) => {
		console.log('waiting for selector')
		let selector1:ElementHandle<any>|null = await res/*[0]*/.waitForSelector(
			loginButtonSelector,
			{timeout: 5000}
		);
		return selector1.click('a.loginButtonDziennikVulcan');
	})
}

function goToPage(res:Array<void>):Page {
	return loadPage('https://uonetplus.vulcan.net.pl/gminawolow');
}

function logOrFetchData(res):Promise<Promise<void>> {
	let page1:Page = res[0];
	let titleOfPAge:Promise<string> = page1.title();

	return titleOfPAge.then(async (res, rej) => {
		console.log(res.toLowerCase());
		switch (res.toLowerCase()) {
			case 'dziennik vulcan':
				if (await page1.$(loginButtonSelector) !== null) {
					console.log('opt1');
					return clickLogin()
					.then(writeLoginAndPassword)
				} else if (await page1.$('div.panel.sprawdziany') !== null) {
					console.log('opt2');
					return Promise.resolve();
				}
				break;
			case 'logowanie (gminawolow)':
		}
	})
}

function writeLoginAndPassword() {
	let resolver;
	let loginPromise = new Promise(res => {resolver = res});
	let processToSignIn;
	processToSignIn = spawn('npx', ['babel-node', 'continuation'], {shell: true})
	let name1 = 'signing in';
	attachFunc({
		processObject: processToSignIn,
		name: name1,
		onData: function(data) {
			if ( data.toString() === 'singning in was successful' ) {
				console.log(`Process of ${name1} produced output:\n  ${data}`)
				resolver('continue after login');
			}
		}
	})
	return loginPromise;
}

function saveCookies():void {
		let processOfSavingCookies:ChildProcess;
		processOfSavingCookies = spawn('ts-node', ['CookiesFetcher.ts'], {shell: true})
		let name1 = 'fetching cookies';
		attachFunc({
			processObject: processOfSavingCookies,
			name: name1,
		})
}

function fetchData() {
		let processOfFetchAndWrite;
		processOfFetchAndWrite = spawn('npx', ['babel-node', 'test4'], {shell: true})
		let name1 = 'fetching and saving data';
		attachFunc({
			processObject: processOfFetchAndWrite,
			name: name1,
			onData: function(data) {
				if (data === "Error seen in test4:  user must log in again") {
					clickLogin()
					.then(writeLoginAndPassword)
					.then(processOfFetchAndWrite.stdin.write('browser has already logged again'))
				} else {
					console.log(`Process of ${name1} produced output:\n  ${data}`)
				}
			}
		})
}

loadBrowserAndPage();