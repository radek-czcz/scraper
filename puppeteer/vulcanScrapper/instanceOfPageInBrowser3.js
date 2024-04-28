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
	page = browser.then((res, err) => {
		if (err) {console.dir(err)}
		else {
		return loadPage('https://uonetplus.vulcan.net.pl/gminawolow');}})
	.catch(err => console.log(err));
	let click1 = page.then(() => clickLogin())
	let spawnProcess = click1.then(() => {
		childProcessWriteLogingPassword = spawn('npx', ['babel-node', 'continuation'],{
			shell: true})
		childProcessWriteLogingPassword.stdout.on('data', (data) => {
			if ( data.toString() === 'ended' ) {
				console.log("Login to Vulcan system has ended, so I'm gonna run timing processes which collect data")
				/*setTimeout(() => {
					childProcessWriteDataToDB = spawn('npx', ['babel-node', 'continuation2'], {shell: true})
					intervalTimer = setTimeout(() => spawn('npx', ['babel-node', 'continuation2'], {shell: true}), getTime(1/60*3/2, 1/120));
					childProcessWriteDataToDB.stdout.on('data', (data) => {
						console.log(`stdout:\n${data}`);
					});
					childProcessWriteDataToDB.stderr.on('data', (data) => {
						console.error(`stderr: ${data}`);
					});
					childProcessWriteDataToDB.on('error', (error) => {
						console.error(`error: ${error.message}`);
					});
					childProcessWriteDataToDB.on('close', (code) => {
						console.log(`child process exited with code ${code}`);
					});
				}, waittime)*/
					childProcessWriteDataToDB = spawn('npx', ['babel-node', 'test4'], {shell: true})
					childProcessWriteDataToDB.stdout.on('data', (data) => {
						console.log(`stdout:\n${data}`);
					});
					childProcessWriteDataToDB.stderr.on('data', (data) => {
						console.error(`stderr: ${data}`);
					});
					childProcessWriteDataToDB.on('error', (error) => {
						console.error(`error: ${error.message}`);
					});
					childProcessWriteDataToDB.on('close', (code) => {
						console.log(`child process exited with code ${code}`);
					});
			}
			console.log(`stdout:\n${data}`);});
		childProcessWriteLogingPassword.stderr.on('data', (data) => {
		  console.error(`stderr: ${data}`);});
		childProcessWriteLogingPassword.on('error', (error) => {
		  console.error(`error: ${error.message}`);});
		childProcessWriteLogingPassword.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);});
		process.stdin.on('data', (data) => childProcessWriteLogingPassword.stdin.write(data))})}

function clickLogin() {
	return page.then(async (res, err) => {
		page = res;
		let selector1 = await res[0].waitForSelector(
			loginButtonSelector,
			 {timeout: 5000}
		);
		return selector1.click('a.loginButtonDziennikVulcan');
	})}

/*function checkIfSelectorsAvailable() {
	let titleOfPAge = page[0].title();

	titleOfPAge.then(async (res, rej) => {
		switch (res.toLowerCase()) {
			case 'dziennik vulcan':
				if (await page.$(loginButtonSelector) !== null) {
					clickLogin();
				}
				else if (await page.$('#LoginName') !== null) {
					console.log('writing login and password')
				}
			break;
			case 'logowanie (gminawolow)':

		}
	})}*/

loadBrowserAndPage();