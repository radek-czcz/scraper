import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { spawn } from 'child_process';
import credentials from './VulcanConnectionSettings.js'

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
// 3. WAIT FOR SELECTORS
function connectToExistingInstance() {

	getBrowserFromParentProcess()
	.then(() => {
		let page

		let pagePromise = getPage()
		.catch(err => console.log('getPage() function failed: ', err));

		let typePassword = pagePromise
		.then((res, err) => {
			page = res;                                                                  
	        console.log('writing login');                                             
	        return page.type('#LoginName', credentials.user, {delay: 100})
	    })
	    .then(() => {
			console.log('writing password');
			return page.type('#Password', credentials.password, {delay: 100});
		})

		let clickSubmit = typePassword
		.then((res, err) => {
			return page.click('div.center > input[type="submit"]')
		})

		let waiting = clickSubmit
		.then(res => {
			let pr1 = page.waitForSelector('div.panel.sprawdziany > div.subDiv.pCont > div');
			let pr2 = page.waitForSelector('div.panel.plan > div.subDiv.pCont > div');
			return Promise.all([pr1, pr2])
			.catch(err => cosnole.log('waiting for selectors failed'));
		})

		return waiting.then(res => {process.stdout.write('singning in was successful'); page.browser().disconnect()})
	})
}

connectToExistingInstance();
