import {loadPuppeteer} from '../../vulcanScrapper/puppLoader';
import {Browser} from 'puppeteer'

export default function newBrowser(browserHolder:Browser|undefined):Promise<Browser> {
	let brow1:Promise<Browser> = loadPuppeteer(false);
	return brow1.then((res:Browser) => {browserHolder = res; return res})
}