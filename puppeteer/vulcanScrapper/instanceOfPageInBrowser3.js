import { loadPuppeteer, loadPage } from './puppLoader.js';
import { spawn } from 'child_process';
import getTime from './RandomTimeInterval.js'

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON

let browser;
let page;
const loginButtonSelector = 'a.loginButtonDziennikVulcan';
let childProcessWriteLogingPassword;
let childProcessWriteDataToDB;
let intervalTimer;

function loadBrowserAndPage() {
	const date1 = new Date('April 25, 2024 20:17:00');
	let now = new Date();
	let waittime = date1.getTime() - now.getTime();

	browser = loadPuppeteer(false);
	let resolver;
	let cookiesPromise = new Promise(res => {resolver = res});

	let cookiesSet = browser.then(() => {
		let processToSetCookies;
		processToSetCookies = spawn('npx', ['babel-node', 'CookiesSetter'],{shell: true})
		processToSetCookies.stdout.on('data', (data) => {
			if ( data.toString() === 'cookies set' ) {
				resolver();
			}
			console.log(`childProcessWriteLogingPassword: ${data}`);
		});
		processToSetCookies.stderr.on('data', (data) => {
		  console.error(`stderr: ${data}`);
		});
		processToSetCookies.on('error', (error) => {
		  console.error(`error: ${error.message}`);
		});
		processToSetCookies.on('close', (code) => {
		  console.log(`child process (processToSetCookies) exited with code ${code}`);
		});
		/*process.stdin.on('data', (data) => processToSetCookies.stdin.write(data))*/
	})

	page = Promise.all([cookiesPromise, cookiesSet]).then(goToPage)
	.catch(err => console.log(err));

	// let click1 = page.then(() => clickLogin());
	let click1 = page.then(() => logOrFetchData());

	// let spawnProcess = writeLoginAndPassword();
	// let spawnProcess = click1.then(() => {
	// 	childProcessWriteLogingPassword = spawn('npx', ['babel-node', 'continuation'],{
	// 		shell: true})
	// 	childProcessWriteLogingPassword.stdout.on('data', (data) => {
	// 		if ( data.toString() === 'ended' ) {
	// 			console.log("childProcessWriteLogingPassword: Login to Vulcan system has ended")
	// 				childProcessWriteDataToDB = spawn('npx', ['babel-node', 'test4'], {shell: true})
	// 				childProcessWriteDataToDB.stdout.on('data', (data) => {
	// 					console.log(`   childProcessWriteDataToDB:${data}`);
	// 				});
	// 				childProcessWriteDataToDB.stderr.on('data', (data) => {
	// 					console.error(`   childProcessWriteDataToDB, error: ${data}`);
	// 				});
	// 				childProcessWriteDataToDB.on('error', (error) => {
	// 					console.error(`   childProcessWriteDataToDB, error: ${error.message}`);
	// 				});
	// 				childProcessWriteDataToDB.on('close', (code) => {
	// 					console.log(`   childProcessWriteDataToDB: child process exited with code ${code}`);
	// 				});
	// 		}
	// 		console.log(`childProcessWriteLogingPassword: ${data}`);});
	// 	childProcessWriteLogingPassword.stderr.on('data', (data) => {
	// 	  console.error(`stderr: ${data}`);});
	// 	childProcessWriteLogingPassword.on('error', (error) => {
	// 	  console.error(`error: ${error.message}`);});
	// 	childProcessWriteLogingPassword.on('close', (code) => {
	// 	  console.log(`child process exited with code ${code}`);});
	// 	process.stdin.on('data', (data) => childProcessWriteLogingPassword.stdin.write(data))
	// })
}

function clickLogin() {
	return page.then(async (res, err) => {
		page = res;
		let selector1 = await res[0].waitForSelector(
			loginButtonSelector,
			 {timeout: 5000}
		);
		return selector1.click('a.loginButtonDziennikVulcan');
	})
}

function goToPage(res, err) {
	if (err) {console.dir(err)}
	else {
	return loadPage('https://uonetplus.vulcan.net.pl/gminawolow')}
}

function logOrFetchData() {
	console.log
	let page1;
	let titleOfPAge = page.then(res => {page1 = res[0]; return res[0].title()});

	titleOfPAge.then(async (res, rej) => {
		switch (res.toLowerCase()) {
			case 'dziennik vulcan':
				if (await page1.$(loginButtonSelector) !== null) {
					clickLogin()
					.then(writeLoginAndPassword)
					.then(saveCookies)
				} else if (await page1.$('div.panel.sprawdziany') !== null) {
					fetchData();
				}
			break;
			case 'logowanie (gminawolow)':
		}
	})
}

function writeLoginAndPassword() {
	return new Promise((res1, rej) => {
		childProcessWriteLogingPassword = spawn('npx', ['babel-node', 'continuation'],{
			shell: true})
		childProcessWriteLogingPassword.stdout.on('data', (data) => {
			if ( data.toString() === 'ended' ) {
				console.log("childProcessWriteLogingPassword: Login to Vulcan system has ended")
				res1();
			}
			console.log(`childProcessWriteLogingPassword: ${data}`);});
		childProcessWriteLogingPassword.stderr.on('data', (data) => {
		  console.error(`stderr: ${data}`);});
		childProcessWriteLogingPassword.on('error', (error) => {
		  console.error(`error: ${error.message}`);});
		childProcessWriteLogingPassword.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);});
		process.stdin.on('data', (data) => childProcessWriteLogingPassword.stdin.write(data))
	})
}

function saveCookies(res, rej) {
		let res1;
		let proc;
		proc = spawn('npx', ['babel-node', 'CookiesFetcher'],{
			shell: true})
		proc.stdout.on('data', (data) => {
			if ( data.toString() === 'ended' ) {
				console.log("process: cookies saving has ended")
				res1();
			}
			console.log(`process: cookies saving: ${data}`);});
		proc.stderr.on('data', (data) => {
		  console.error(`stderr: ${data}`);});
		proc.on('error', (error) => {
		  console.error(`error: ${error.message}`);});
		proc.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);});
		process.stdin.on('data', (data) => proc.stdin.write(data))
		return new Promise((res, rej) => {
			res1 = res;
		})
}

function fetchData(res, rej) {
	childProcessWriteDataToDB = spawn('npx', ['babel-node', 'test4'], {shell: true})
	childProcessWriteDataToDB.stdout.on('data', (data) => {
		console.log(`   childProcessWriteDataToDB:${data}`);
	});
	childProcessWriteDataToDB.stderr.on('data', (data) => {
		console.error(`   childProcessWriteDataToDB, error: ${data}`);
	});
	childProcessWriteDataToDB.on('error', (error) => {
		console.error(`   childProcessWriteDataToDB, error: ${error.message}`);
	});
	childProcessWriteDataToDB.on('close', (code) => {
		console.log(`   childProcessWriteDataToDB: child process exited with code ${code}`);
	});
}

loadBrowserAndPage();