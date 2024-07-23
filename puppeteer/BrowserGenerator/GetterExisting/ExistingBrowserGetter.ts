import {getBrowserFromParentProcess} from '../../vulcanScrapper/puppLoader';
import {Browser} from 'puppeteer'

export default function getBrowserFromAnotherProcess(browserHolder:Browser|undefined):Promise<Browser> {
	let brow1:Promise<Browser> = getBrowserFromParentProcess();
	brow1.catch((err:Error) => console.log('Unable to get existing browser from other process. Maybe WSEndpoint server not available'))
	return brow1.then((res:Browser) => {browserHolder = res; return res})
}