import { getBrowserFromParentProcess, getPage } from './index';
import { spawn } from 'child_process';
import credentials from './VulcanConnectionSettings.js'
import {Page, Browser, ElementHandle} from 'puppeteer';
import {getShot} from './Captcha/ScreenshotForCaptcha'
import attachFunc from './ProcessListenersManager'

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
// 3. WAIT FOR SELECTORS
function connectToExistingInstance():void {

	getBrowserFromParentProcess()
	.then(() => {
		let page: Page

		let pagePromise:Promise<Page> = getPage().then(res => {if (res) return res; else throw 'Page not available'})
		.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

		let typeUser:Promise<void> = pagePromise
		.then((res:Page) => {
			page = res;                                                                  
	        console.log('Writing login');                                             
	        return page.type('input#Login', credentials.user, {delay: 100})
	        .then(() => page.click('button#btNext'))
		})

		/*typeUser.then(() => {
			const captchaProcess = spawn('ts-node', ['Captcha/ScreenshotRunner'], {shell: true})
			let name1 = 'Captcha Processing';
			attachFunc({
				processObject: captchaProcess,
				name: name1,
				onData: (data:Buffer) => {
					console.log('data is ' + data);
					console.log(data);
					console.log(data.toString() === 'screenshot taken');
					if (data.toString() === 'screenshot taken') {
						console.log('clicking');
						// page.click('button#btLogOn');
					}
				}
			})
		})*/


		typeUser.then(() => {
			setTimeout(() => {
				console.log('Writing password');
				return page.type('input#Haslo', credentials.password, {delay: 100})
				.then(() => page.click('button#btLogOn'))
			}, 10000)
		})

		/*let waiting:Promise<Array<ElementHandle<any>|null>> = typeUser
		.then(() => {
			let pr1:Promise<ElementHandle<any>|null> = page.waitForSelector('div.panel.sprawdziany > div.subDiv.pCont > div');
			let pr2:Promise<ElementHandle<any>|null> = page.waitForSelector('div.panel.plan > div.subDiv.pCont > div');
			return Promise.all([pr1, pr2])
			.catch((err:Error) => {console.log('Waiting for selectors failed'); throw err});
		})

		return waiting.then(res => {process.stdout.write('Signing in was successful'); page.browser().disconnect()})*/
	})
}

connectToExistingInstance();
