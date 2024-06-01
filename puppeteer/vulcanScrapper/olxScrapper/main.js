import { spawn } from 'child_process';
import { loadPage, loadPuppeteer, getPage, attachFunc, getPu, getBrowserFromParentProcess } from './index.js'

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

	// browser = loadPuppeteer(false);
	let brow1 = getBrowserFromParentProcess()
	.then(res => browser = res)

	let tab1 = brow1.then(addNewTab)

	/*let cookiesSet = browser.then(() => {
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
	})*/

	tab1.then((res) => res.browser().disconnect())
	// cookiesPromise.then(() => browser.disconnect())

	/*page = cookiesPromise
		.then(() => browser.then(res => res.pages()))
		.then(res => res[0].goto(url1, 
			{ waitUntil: 'networkidle2' }
		))
	.catch(err => console.log(err));*/
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

async function addNewTab(res, rej) {
	console.log('adding tab');
	let tabs = await browser.pages();
	let tab = tabs[tabs.length - 1];
	let title = await tab.title();
	if (title === "about:blank" || title === "Nowa karta") {
		console.log('existing tab');
		page = tab
		return Promise.resolve(tab)
	} else { page = await browser.newPage(); return page }
}

loadBrowserAndPage();