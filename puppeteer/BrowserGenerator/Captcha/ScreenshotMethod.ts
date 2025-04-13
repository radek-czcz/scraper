import { ElementHandle } from 'puppeteer'

export default function(captchaContainer:ElementHandle|null):Promise<string|Buffer> {
	if (captchaContainer) {
		console.log('Captcha element found')
		return captchaContainer.screenshot({
			encoding: /*'base64'*/ 'binary',
			path: 'ca2.jpg',
			type: 'jpeg',
			// quality: 100
		})
	}
	else throw "No captcha's selector found. Screeenshot taking failed"
}