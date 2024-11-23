import { getBrowserFromParentProcess, getPage } from '../index';
import {getShot, getGender2} from './ScreenshotForCaptcha'
import solveCaptcha from './Captcha2Request'
import { Page } from 'puppeteer'
import solver from './Captcha2Request'

// getShot()
getBrowserFromParentProcess()
// .then(() => solveCaptcha(getShot()))
.then((br) => {

	let pagePromise:Promise<Page> = getPage().then(res => {if (res) return res; else throw 'Page not available'})
	.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

	const retVal = getShot(pagePromise)

	// solver(retVal);

	getGender2(pagePromise);

	retVal.then(() => br.disconnect())

	return retVal
})
