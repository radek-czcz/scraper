// const pLoader = require('./puppLoader.cjs');
import {getPu} from './vulcanScrapper/puppLoader';
// const pEvaluator = require('./puppEvaluator.cjs');
import {main} from './puppEvaluator';
// const urlParser = require('url-parse');
import urlParser from 'url-parse';
// const pWriter = require('./puppWriterDB.cjs');
import {main as pWriter} from './puppWriterDB.cjs'
import {Browser, Page} from 'puppeteer'

// temp import
	import { getBrowserFromParentProcess } from './vulcanScrapper/olxScrapper/index';

let browser:Browser;

function connectToExistingInstance() {

	// some values initializations
		let pageUrl:string;

	// connect the puppeteer to existing browser session or get the browser
		let pages:Promise<Page[]> = getPu().then(res => {browser = res; return res.pages()});
		// let pages:Promise<Page[]> = getBrowserFromParentProcess().then((res:Browser) => {browser = res; return res.pages()})
	
	// get data
		let dataGet:Promise<void> = pages.then((res:Page[]) => {
			pageUrl = res[0].url();
			return res.map(page => main(page))
		})

	// write data to DB
	  	.then(res => {
	  		// browser.disconnect();
	  		console.log('site: ', urlParser(pageUrl).host);
		    // res.map(data => 
		    // 	data.then(data2 => pWriter(data2[0] as string, data2[1] as string, urlParser(pageUrl).host))
		    // )
		})

	// error catcher
		.catch(err => console.log(err));
}

function getBrowser() {
	return browser;
}

// connectToExistingInstance();

export {connectToExistingInstance};