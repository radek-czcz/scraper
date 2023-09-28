//const puppeteer = require('puppeteer-extra');
const pLoader = require('./puppLoader.js');
const pEvaluator = require('./puppEvaluator.js')
const urlParser = require('url-parse');
const pWriter = require('./puppWriterDB.js')

let browser;

function connectToExistingInstance() {
	let pageUrl;
	let pages = pLoader.getPu().then(res => res.pages())
	.catch(err => console.log(err));
	let titArray = [];
	pages.then(res => {
		//console.dir(res, {depth: 0});
		pageUrl = res[0].url();
		console.log('res:');
		console.dir(res, {depth: 1});
		res.forEach(
			(inp) => {
				titArray.push(inp.title())
		})
		console.dir('titArray: ' + titArray, {depth: 0})
		return titArray;
	})

	.then((res) => {
		Promise.all(res)
		.then(res2 => {
			console.log(res2);
		})
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

function getBrowser() {
	return browser;
}


connectToExistingInstance();

module.exports = {getBrowser};