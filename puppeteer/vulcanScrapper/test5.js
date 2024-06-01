import { loadPuppeteer, loadPage, getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { spawn } from 'child_process';
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

function connect() {
	getBrowserFromParentProcess()
	.then(res => getPage()) 
	.then(res => res.waitForSelector(
		loginButtonSelector,
		{timeout: 5000}
	))
	.then(res => res.click())
}

function clickLogin() {
	return page.then(res => {
		// page = res;
		console.log('waiting for selector')
		let selector1 = res.waitForSelector( //UWAGA TUTAJ MA BYĆ res[0]
			loginButtonSelector,
			{timeout: 5000}
		).catch((err) => console.error(err))
		return selector1.then(() => res.click(loginButtonSelector));
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
				console.log(`Process of ${name1} produced output:\n${data}`)
				resolver('continue after login');
			}
			else {console.log(`Process of ${name1} produced output:\n${data}`);}
		}
	})
	return loginPromise;
}

function fetchData(res, rej) {
		let processOfFetchAndWrite;
		processOfFetchAndWrite = spawn('npx', ['babel-node', 'test0'], {shell: true})
		let name1 = 'fetching and saving data';
		attachFunc({
			processObject: processOfFetchAndWrite,
			name: name1,
			/*onData: function(data) {
				console.log(data.toString());
				if (data.toString().includes("Error seen in test4: user must log in again")) {
					console.log("log1");
					clickLogin()
					.then(writeLoginAndPassword)
					.then(processOfFetchAndWrite.stdin.write('browser has already logged again'))
				} else {
					console.log("log2");
					console.log(`Process of ${name1} produced output:${data}`)
				}
			},*/
			/*onClose: function(code) {
				if(code === 1) {
					console.log("new start");
					clickLogin()
					.then(writeLoginAndPassword)
					.then(processOfFetchAndWrite.stdin.write('browser has already logged again'))
				} else {
					console.log(`Process of ${name1} has ended with code:${code}`);
				}
			},*/
			onData: function(errData) {
				console.log(errData.toString());
				if (errData.toString().includes('user must log in again')) {
					clickLogin()
					.then(writeLoginAndPassword)
					.then(fetchData());
				}
			}
		})
}

connect();