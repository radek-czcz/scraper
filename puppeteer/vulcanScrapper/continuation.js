import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { spawn } from 'child_process';

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
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
	        return page.type('#LoginName', 'kamila.miterska7@gmail.com', {delay: 100})
	    })
	    .then(() => {
			console.log('writing password');
			return page.type('#Password', 'Hubik3Cz', {delay: 100});
		})

		let clickSubmit = typePassword
		.then((res, err) => {
			return page.click('div.center > input[type="submit"]')
		})

		let waiting = clickSubmit
		.then(res => {
			let pr1 = page.waitForSelector('div.panel.sprawdziany > div.subDiv.pCont > div');
			let pr2 = page.waitForSelector('div.panel.plan > div.subDiv.pCont > div');
			return Promise.all([pr1, pr2]);
		})

		.then(() => spawn('npx', ['babel-node', 'continuation2']))
	})
}
connectToExistingInstance();