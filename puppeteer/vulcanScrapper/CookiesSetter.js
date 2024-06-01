import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import fs from 'fs';

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
export function connectToExistingInstance() {

	getBrowserFromParentProcess()
	.then(() => {

		let pathToCookies = process.argv['path'] ? process.argv['path'] : './cookies.json'

		let page;
		let cookies;

		function getCookies() {
			return new Promise ((res1, rej) => fs.readFile(pathToCookies, function(err, data) {
				if(err) {
					console.log('reading cookies file failed');
					throw err;
				}
				cookies = JSON.parse(data);
				res1()
			}))
		}

		let cokkieF = getCookies();

		let pagePromise = getPage()
		.catch(err => console.log('getPage() function failed: ', err));

		let setC = pagePromise
		.then((res, err) => {
			page = res;
	    })
	    .then(() => page.setCookie(...cookies), 1500)
	    .then((res, err) => {
	    	if (!err) {
	    		console.log('cookies have been set')
	    		process.stdout.write('cookies set')
	    	} else console.error(err);
	    	return page.browser().disconnect();
	    })
	    .catch(err => {console.log('cookies could not been set'); page.browser().disconnect()});
	})
}
connectToExistingInstance();
