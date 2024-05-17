//const puppeteer = require('puppeteer-extra');
const pLoader = require('./puppLoader.cjs');
const pEvaluator = require('./puppEvaluator.cjs')
const urlParser = require('url-parse');
const pWriter = require('./puppWriterDB.cjs')

let browser;

function connectToExistingInstance() {
	let pageUrl;
	let pages = pLoader.getPu().then(res => res.pages())
	.catch(err => console.log(err));
	let titleOfPage;
	pages.then(res => {
		console.dir(res, {depth: 0});
		pageUrl = res[0].url();
		console.log('res:');
		console.dir(res, {depth: 1});
		return res[0].title();
	})

	.then((res) => {
		console.dir('titleOfPage: ' + res, {depth: 0})
	})
	.then(res => {
		console.log('pEvaluator starting');
		return pEvaluator.main();
	})
  	.then(res => {
  		console.log(urlParser(pageUrl).host);
	    pWriter.main(res[0], res[1], urlParser(pageUrl).host)
	});
}

function getBrowser() {
	return browser;
}


connectToExistingInstance();

module.exports = {getBrowser};