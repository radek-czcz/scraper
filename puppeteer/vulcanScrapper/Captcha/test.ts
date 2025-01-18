import credentials from './Captcha2Credentials'
import { readFileSync } from 'node:fs';
import {Solver} from "@2captcha/captcha-solver"
import names from './names'
import {getShot, getGender2} from './ScreenshotForCaptcha'
import { getBrowserFromParentProcess, getPage } from '../../BrowserGenerator/PuppeteerBrowserOperations/puppLoader';
import {Page} from 'puppeteer'
import solverRunner from './Captcha2Request'

// const solver = new Solver(credentials.apiKey)

// getBrowserFromParentProcess()
// .then((br) => {

// 	let pagePromise:Promise<Page> = getPage().then(res => {if (res) return res; else throw 'Page not available'})
// 	.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

// 	let result:Promise<string | null> = getGender2(pagePromise);

// 	result.then((val:string | null) => {
// 		if (typeof val === 'string')
// 		switch (true) {
// 			case val.includes('męskie'): console.log('męskie'); break;
// 			case val.includes('żeńskie'): console.log('żeńskie'); break;
// 		}
// 		br.disconnect();
// 	})
// })

getBrowserFromParentProcess()
.then((br) => {

	let pagePromise:Promise<Page> = getPage().then(res => {if (res) return res; else throw 'Page not available'})
	.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

	solverRunner(getShot(pagePromise), getGender2(pagePromise))
	.then((res:string|undefined) => console.log(res));
})


