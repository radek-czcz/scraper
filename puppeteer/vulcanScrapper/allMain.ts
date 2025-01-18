import { loadPuppeteer, loadPage } from './index';
import { spawn, ChildProcess } from 'child_process';
import getTime from './RandomTimeInterval'
import attachFunc from './ProcessListenersManager'
import {Browser, Page, ElementHandle} from 'puppeteer'
import process from 'node:process'
import {setCookies, saveCookies as saveCookies2, config} from './config'
// import { getShot } from './Captcha/ScreenshotForCaptcha'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser: Promise<Browser>;
let page:Promise<Page>;
const loginButtonSelector:string = 'input#Login';
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
	// const date1:Date = new Date('April 25, 2024 20:17:00');
	// let now:Date = new Date();
	// let waittime:number|typeof NaN = date1.getTime() - now.getTime();

	browser = loadPuppeteer(false);
	let resolver:Function;
	let cookiesPromise:Promise<void> = new Promise(res => {resolver = res});

	const navigate:Promise<Page> = browser.then(() => goToPage())
	const insertCookies:Promise<void> = navigate.then(() => setCookies(config, resolver))

	const reload = Promise.all([navigate, insertCookies, cookiesPromise]).then((tabWithCookies:[Page, void, void]) => tabWithCookies[0].reload({waitUntil:'networkidle0'}))
	// .catch((err:Error) => {console.log(err); throw err})

	let logging:Promise<void> = Promise.all([navigate, reload]).then(res => res[0].click('a.extra-button.extra-button-gray[title = "Logowanie zwykłe konto szkolne"]'));

	logging.then(() => {
		let prCont:ChildProcess;
		prCont = spawn('ts-node', ['continuation'], {shell: true})
		let name1 = 'continue';
		attachFunc({
			processObject: prCont,
			name: name1,
		})
	})

	// let gettingCookies:Promise<void> = logging.then(res => {
	// 		saveCookies();
	// })

	// let fetchingData = logging.then(res => {
	// 	console.log('from fetching');
	// 	return fetchData();
	// });
}

// function clickLogin():Promise<Promise<void>> {
function clickLogin():Promise<void> {
	// return page.then(async (res:Page) => {
	// 	console.log('waiting for selector')
	// 	let selector1:ElementHandle<any>|null = await res/*[0]*/.waitForSelector(
	// 		loginButtonSelector,
	// 		{timeout: 5000}
	// 	);
	// 	return selector1.click('a.loginButtonDziennikVulcan');
	// })
	let handle:Promise<ElementHandle<any>|null> = page.then((res:Page) => {
		console.log('waiting for selector');
		let selector1:Promise<ElementHandle<any>|null> = res.waitForSelector(
			loginButtonSelector,
			{timeout: 5000}
		);

		return selector1;

		// return selector1.then((res:ElementHandle<any>|null) => res ? res : 
		// 	throw "Selector for click not found"
	})

	return handle.then((res:ElementHandle<any>|null) => 
		res ? res.click(/*'a.loginButtonDziennikVulcan'*/) : undefined
	)
}

function goToPage():Promise<Page> {
	return loadPage('https://dziennik-uczen.vulcan.net.pl/gminawolow' /*'https://uonetplus.vulcan.net.pl/gminawolow/LoginEndpoint.aspx'*/);
}

function logOrFetchData(res:Page):Promise<void> {
	let page1:Page = res
	let titleOfPAge:Promise<string> = page1.title();

	return titleOfPAge.then(async (res1:string) => {
		console.log(res1.toLowerCase());
		switch (res1.toLowerCase()) {
			case 'uczeń':
				if (await page1.$(loginButtonSelector) !== null) {
					console.log('opt1');
					return clickLogin()
					.then(writeLoginAndPassword)
				} else if (await page1.$('div.panel.sprawdziany') !== null) {
					console.log('opt2');
					return Promise.resolve();
				}
				break;
			case 'logowanie': return writeLoginAndPassword()
		}
	})
}

function writeLoginAndPassword():Promise<void> {
	let resolver:Function;
	let loginPromise:Promise<void> = new Promise(res => {resolver = res});
	let processToSignIn;
	processToSignIn = spawn('ts-node', ['continuation'], {shell: true})
	let name1 = 'signing in';
	attachFunc({
		processObject: processToSignIn,
		name: name1,
		onData: function(data:string) {
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
			onData: function(data:string) {
				if (data === "Error seen in test4:  user must log in again") {
					clickLogin()
					.then(writeLoginAndPassword)
					.then(() => processOfFetchAndWrite.stdin.write('browser has already logged again'))
				} else {
					console.log(`Process of ${name1} produced output:\n  ${data}`)
				}
			}
		})
}

loadBrowserAndPage();

export { logOrFetchData }