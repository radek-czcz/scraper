import { getBrowserFromParentProcess, getPage } from '../../BrowserGenerator/PuppeteerBrowserOperations/puppLoader';
import { Page, Browser, ElementHandle, JSHandle } from 'puppeteer'

function getShot(page?:Promise<Page>):Promise<string|Buffer> {
	
	let pageToOperate:Promise<Page>

	page ? pageToOperate = page : pageToOperate = /*getBrowserFromParentProcess()*/ getPage()
	
	let page2/*:Promise<string|Buffer>*/ = pageToOperate
	// .then(() => getPage())
	
	const container = page2.then((tab:Page) => tab.$('div.v-captcha-container'))

	// container.then(captchaContainer => {
	// 	if (captchaContainer) {
	// 		console.log('captcha present')
	// 	} else {
	// 		console.log('captcha not present')}
	// 	})

	let sShot = container.then((captchaContainer:ElementHandle|null) => {
		if (captchaContainer) {
			console.log('Captcha is present')
			return captchaContainer.screenshot({
				encoding: 'base64' /*'binary'*/,
				path: 'ca2.jpg',
				type: 'jpeg'
			})}
		else throw "No captcha's selector found. Screeenshot taking failed"
	})

	sShot.then(() => process.stdout.write('screenshot taken'), (err) => console.log(err))

	return sShot;
}

function getGender(page?:Promise<Page>) {
	
	let pageToOperate:Promise<Page>

	page ? pageToOperate = page : pageToOperate = /*getBrowserFromParentProcess()*/ getPage()
	
	let page2/*:Promise<string|Buffer>*/ = pageToOperate
	// .then(() => getPage())
	
	const textElement = page2.then((tab:Page) => tab.$('div.v-captcha-input > label'))

	return textElement
		.then((gender:ElementHandle|null) => {
			if (gender) return gender.getProperty('textContent')
		})
		.then((inp:JSHandle<unknown> | undefined) => inp ? inp.jsonValue() : undefined)
		.then((inp:unknown) => {if (inp) console.log(inp)})
}

async function getGender2(page?:Promise<Page>):Promise<string | null> {

	let pageToOperate:Page

	page ? pageToOperate = await page : pageToOperate = /*getBrowserFromParentProcess()*/ await getPage()

	let page2 = pageToOperate

	const textElement:ElementHandle|null = await page2.$('div.v-captcha-input > label')

	let jsh:JSHandle<unknown> | undefined = await textElement?.getProperty('textContent');

	let value:unknown =  await jsh?.jsonValue();

	if (typeof value === 'string') {
		return <string>value;
	}

	return null
}

export { getShot, getGender, getGender2 }