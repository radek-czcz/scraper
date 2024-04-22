import { loadPuppeteer, loadPage } from './puppLoader.js';
import { spawn } from 'child_process';

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON
function loadBrowserAndPage() {

	let page;

	loadPuppeteer(false)
	.then((res, err) => {
		if (err) {console.dir(err)}
		else {
			return /*pLoader.*/loadPage('https://uonetplus.vulcan.net.pl/gminawolow');
		}
	}).catch(err => console.log(err))
	.then(async res => {
		page = res;
		let selector1 = await res[0].waitForSelector(
			'a.loginButtonDziennikVulcan',
			 {timeout: 5000}
		);
		return selector1.click('a.loginButtonDziennikVulcan');
	})
	// .then(() => spawn('node', ['continuation.js']))
	.then(() => {
		const child = spawn('npx', ['babel-node', 'continuation'],{
			shell: true
		})
		child.stdout.on('data', (data) => {
		  console.log(`stdout:\n${data}`);
		});

		child.stderr.on('data', (data) => {
		  console.error(`stderr: ${data}`);
		});

		child.on('error', (error) => {
		  console.error(`error: ${error.message}`);
		});

		child.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);
		});

		process.stdin.on('data', (data) => child.stdin.write(data))
	})
	/*.then(() => pLoader.getPu())
	.then(res => res.close())
	.then(() => {
		log();
	})*/
}

loadBrowserAndPage();