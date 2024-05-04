import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import fs from 'fs';

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
function connectToExistingInstance() {

	getBrowserFromParentProcess()
	.then(() => {

		let page;
		let cookies;

		function getCookies() {
			return new Promise ((res1, rej) => fs.readFile('./cookies.json', function(err, data) {
				if(err)
					throw err;
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
	    	page.browser().disconnect();
	    });
	})
}
connectToExistingInstance();
