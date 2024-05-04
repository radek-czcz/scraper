import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { writeFile } from 'node:fs/promises'

function connectToExistingInstance() {
	getBrowserFromParentProcess()
	.then(() => {
		let page;
		let cookies;
		let fetchFunc1 = () => {writeFile('./cookies.json', JSON.stringify(cookies, null, 2))}
		let fetchFunc2 = () => console.log(cookies);

		let pagePromise = getPage()
		.catch(err => console.log('getPage() function failed: ', err));

		let fetchCookies = pagePromise
		.then(async (res, err) => {
			page = res;
			cookies = await page.cookies();
			// return writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
			return fetchFunc1()
		})

		let exitAll = fetchCookies.then(() => {
			process.stdout.write('ended'); 
			page.browser().disconnect();
		})
		return exitAll;
	})
}

connectToExistingInstance();