import {loadPuppeteer} from '../../vulcanScrapper/puppLoader';
import {Browser} from 'puppeteer'

export default function newBrowser(browserHolder:Browser):Promise<Browser> {
	let brow1:Promise<Browser> = loadPuppeteer(false)
	.then((res:Browser) => {browserHolder = res; return res})
}