import { spawn } from 'child_process';
import { loadPage, loadPuppeteer, getPage, attachFunc, getPu } from './index.mjs'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser;
let page;
let childProcessWriteDataToDB;
let url1 = 'https://www.olx.pl/motoryzacja/samochody/toyota/q-avensis/?search%5Border%5D=created_at:desc&search%5Bfilter_float_year:from%5D=2006&search%5Bfilter_float_year:to%5D=2008&search%5Bfilter_float_enginesize:to%5D=1900&search%5Bfilter_enum_petrol%5D%5B0%5D=petrol&search%5Bfilter_enum_petrol%5D%5B1%5D=lpg&search%5Bfilter_enum_car_body%5D%5B0%5D=estate-car&search%5Bfilter_float_milage:to%5D=200000';

function loadBrowserAndPage() {

	let resolver;
	let cookiesPromise = new Promise(res => {resolver = res});

	browser = loadPuppeteer(false);
	// let b1, b2
	// let browser3 = loadPuppeteer(false).then(res => b1 = res)
	// let browser2 = browser3.then(() => getPu().then(res => b2 = res));
	// browser = browser3

	let cookiesSet = browser.then(() => {
		let processToSetCookies;
		processToSetCookies = spawn('npx', ['babel-node', '../CookiesSetter', 'path=./cookies.json'],{shell: true});
		let name1 = 'Cookies setting';
		attachFunc({
			processObject: processToSetCookies,
			name: name1,
			onData: function(data) {
				if ( data.toString() === 'cookies set' ) {
					resolver();
				}
				console.log(`Process of ${name1} produced output:\n  ${data}`);
			}
		})
	})

	page = cookiesPromise
	// .then(goToPage)
	.then(() => browser.then(res => res.pages()))
	.then(res => res[0].goto(url1, 
		{ waitUntil: 'networkidle2' }
	))
	// Promise.all([browser2, browser3]).then(() => {console.log(b1 === b2, `\n`, b1, '\n', b2 )})
	.catch(err => console.log(err));
}

function goToPage(res, err) {
	if (err) {console.dir(err)}
	else {
		return loadPage(url1);
	}
}

function logOrFetchData(res) {
	let page1 = res[0];
	let titleOfPAge = page1.title();

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

function saveCookies(res, rej) {
		let processOfSavingCookies;
		processOfSavingCookies = spawn('npx', ['babel-node', 'CookiesFetcher'], {shell: true})
		let name1 = 'fetching cookies';
		attachFunc({
			processObject: processOfSavingCookies,
			name: name1,
		})
}

function fetchData(res, rej) {
		let processOfFetchAndWrite;
		processOfFetchAndWrite = spawn('npx', ['babel-node', 'TimingFunctions'], {shell: true})
		let name1 = 'SETTING TIMING FUNCTIONS';
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