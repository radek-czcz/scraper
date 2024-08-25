import {getPu} from './vulcanScrapper/puppLoader';
import {main} from './puppEvaluator';
import urlParser from 'url-parse';
// import {main as pWriter} from './puppWriterDB'
import pWriter from '../NodeMySQL/WriterToDB'
import {Browser, Page} from 'puppeteer'

// TEMP IMPORT
	import { getBrowserFromParentProcess } from './vulcanScrapper/olxScrapper/index';

let browser:Browser;

function connectToExistingInstance():Promise<void> {

	// SOME VALUES INITIALIZATIONS
		let pageUrl:string;

	// CONNECT THE PUPPETEER TO EXISTING BROWSER SESSION OR GET THE BROWSER
		// let pages:Promise<Page[]> = getPu().then(res => {browser = res; return res.pages()});
		let pages:Promise<Page[]> = getBrowserFromParentProcess()
			.then((res:Browser) => {browser = res; return res.pages()})
	
	// GET DATA
		let dataGet:Promise<void> = pages.then((res:Page[]) => {
			pageUrl = res[0].url();
			return res.map((page:Page) => main(page))
		})

	// WRITE DATA TO DB
	  	.then((res:Promise<[string[], string[], string[]]>[]) => {
	  		// browser.disconnect();
		    res.map((data:Promise<[string[], string[], string[]]>) => 
		    	data.then((data2:[string[], string[], string[]]) => 
		    		pWriter(data2[0] as string[], data2[1] as string[], urlParser(pageUrl).host))
		    )
		})

	// ERROR CATCHER
		.catch(err => console.log(err));

		return dataGet
}

function getBrowser():Browser {
	return browser;
}

// connectToExistingInstance();

export {connectToExistingInstance};
