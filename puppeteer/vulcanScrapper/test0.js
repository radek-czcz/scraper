import { loadPuppeteer, loadPage } from './puppLoader.js';
import { spawn } from 'child_process';
import getTime from './RandomTimeInterval.js'
import attachFunc from './ProcessListenersManager.js'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser;
let page;
const loginButtonSelector = 'a.loginButtonDziennikVulcan';
let childProcessWriteLogingPassword;
let childProcessWriteDataToDB;
let intervalTimer;

process.stdin.on('data', data => {
	if (data.toString() === "close test11") {
		processOfFetchAndWrite.stdout.on('data', data => {
			console.log(data);
		})
		processOfFetchAndWrite.stdin.write(data);
	}
})

function loadBrowserAndPage() {
	const date1 = new Date('April 25, 2024 20:17:00');
	let now = new Date();
	let waittime = date1.getTime() - now.getTime();

	browser = loadPuppeteer(false);
	let resolver;
	let cookiesPromise = new Promise(res => {resolver = res});

	let cookiesSet = browser.then(() => {
		let processToSetCookies;
		processToSetCookies = spawn('npx', ['babel-node', 'CookiesSetter'],{shell: true});
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

	page = Promise.all([cookiesPromise, cookiesSet]).then(goToPage)
	.catch(err => console.log(err))
}

function goToPage(res, err) {
	if (err) {console.dir(err)}
	else {
	return loadPage('https://uonetplus.vulcan.net.pl/gminawolow');
	}
}

loadBrowserAndPage();