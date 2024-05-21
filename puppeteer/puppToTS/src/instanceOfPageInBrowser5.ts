import * as puppeteer from 'puppeteer';
import {loadPuppeteer} from './puppLoader';

export function loadBrowserAndPage(): void {
	loadPuppeteer(false);
/*	.then((res, err) => {
		if (err) {console.dir(err)}
		else {
		console.log('browserWsEndpoint: ' + res.wsEndpoint());
		}
	})*/
}

loadBrowserAndPage()
