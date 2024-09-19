import { getBrowserFromParentProcess, getPage } from '../../BrowserGenerator/PuppeteerBrowserOperations/puppLoader';
import { Page, Browser, ElementHandle } from 'puppeteer'

function getShot(page?:Promise<Page>):Promise<string|Buffer> {
	let pageToOperate:Promise<Page>
	page ? pageToOperate = page : pageToOperate = /*getBrowserFromParentProcess()*/ getPage()
	let sShot:Promise<string|Buffer> = pageToOperate
	.then(() => getPage())
	.then((tab:Page) => tab.$('div.v-captcha-container'))
	.then((elH:ElementHandle|null) => {
		if (elH) return elH.screenshot({
			encoding: 'base64',
			// path: 'ca.png'
    	})
		else throw "No captcha selector found"
	})

	sShot.then(() => console.log('screenshot taken'), () => console.log('screenshot failed'))

	return sShot;
}

export { getShot }