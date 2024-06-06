import {Browser, Page, ElementHandle} from 'puppeteer'
import { getBrowserFromParentProcess, getPageWithSelect } from '../puppLoader';
const log = require('why-is-node-running');

let br:Promise<Browser> = getBrowserFromParentProcess();
let pa:Promise<Page>/* = br.then(() => getPageWithSelect());*/
let browser:Browser;

export function getThePageTab(carBrand:string):Promise<Page> {

	let allTabs:Page[];
	let prArray:Promise<Page> = br.then((res:Browser) => {browser = res; return res.pages()}).then((tabs:Page[]) => {
		allTabs = tabs
		return tabs.map((tab:Page) => tab.title())
	}).then((res:Promise<string>[]) => Promise.all(res).then((arr:string[]) => {
		let ind:number = arr.findIndex((inp:string) => inp.toLowerCase().includes(carBrand))
		console.log('returning tab: ', arr[ind] );
		browser.disconnect();
		return allTabs[ind]
	}))
	return prArray
}

function setBrowser(browser1:Browser) {
	browser = browser1;
}

