//const puppeteer = require('puppeteer-extra');
const pLoader = require('./puppLoader.cjs');
const pEvaluator = require('./puppEvaluator.cjs')
const urlParser = require('url-parse');
const pWriter = require('./puppWriterDB.cjs')
const pr = require('node:fs/promises')

let browser;

function connectToExistingInstance() {
	let pageUrl;
	let cookies;

	let fetchFunc1 = () => {pr.writeFile('./cookies.json', JSON.stringify(cookies, null, 2))}
	let fetchFunc2 = () => console.log(cookies);

	let pagePromise;

	let pages = pLoader.getPu().then(res => res.pages())
	.catch(err => console.log(err));

	pages.then(res => {
		pagePromise = pLoader.getPage();
		return pagePromise;
	})
	.then(async (res, err) => {
		page = res;
		cookies = await page.cookies();
		return fetchFunc1();
	})
}

connectToExistingInstance();