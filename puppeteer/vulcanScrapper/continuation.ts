import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { spawn } from 'child_process';
import credentials from './VulcanConnectionSettings.js'
import {Page, Browser, ElementHandle} from 'puppeteer';

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
// 3. WAIT FOR SELECTORS
function connectToExistingInstance():void {

	getBrowserFromParentProcess()
	.then(() => {
		let page: Page

		let pagePromise:Promise<Page> = getPage().then(res => {if (res) return res; else throw 'Page not available'})
		.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

		let typePassword:Promise<void> = pagePromise
		.then((res:Page) => {
			page = res;                                                                  
	        console.log('Writing login');                                             
	        return page.type('#LoginName', credentials.user, {delay: 100})
		}).then(() => {
			console.log('Writing password');
			return page.type('#Password', credentials.password, {delay: 100});
		})

		let clickSubmit:Promise<void> = typePassword
		.then(() => {
			return page.click('div.center > input[type="submit"]')
		})

		let waiting:Promise<Array<ElementHandle<any>|null>> = clickSubmit
		.then(() => {
			let pr1:Promise<ElementHandle<any>|null> = page.waitForSelector('div.panel.sprawdziany > div.subDiv.pCont > div');
			let pr2:Promise<ElementHandle<any>|null> = page.waitForSelector('div.panel.plan > div.subDiv.pCont > div');
			return Promise.all([pr1, pr2])
			.catch((err:Error) => {console.log('Waiting for selectors failed'); throw err});
		})

		return waiting.then(res => {process.stdout.write('Signing in was successful'); page.browser().disconnect()})
	})
}

connectToExistingInstance();
