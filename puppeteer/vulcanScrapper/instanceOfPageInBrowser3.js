const pLoader = require('./puppLoader.js');
const { spawn } = require('child_process');
const log = require('why-is-node-running');

// 1. OPEN BROWSER
// 2. LOAD WEBPAGE
// 3. CLICK LOGIN BUTTON
function loadBrowserAndPage() {

	let page;

	pLoader.loadPuppeteer(false)
	.then((res, err) => {
		if (err) {console.dir(err)}
		else {
			return pLoader.loadPage('https://uonetplus.vulcan.net.pl/gminawolow');
		}
	})
	.then(async res => {
		page = res;
		let selector1 = await res[0].waitForSelector(
			'a.loginButtonDziennikVulcan',
			 {timeout: 5000}
		);
		return selector1.click('a.loginButtonDziennikVulcan');
	})
	.then(() => {
		const child = spawn('node', ['continuation.js'])

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
	})
	.then(() => pLoader.getPu())
	.then(res => res.close())
	/*.then(() => {
		log();
	})*/
}

loadBrowserAndPage()

module.exports = { loadBrowserAndPage };