import { ElementHandle } from 'puppeteer'
import { writeFile } from 'node:fs/promises';

// reads base64 string from src of HTMLImageElement
export default function(captchaImageContainer:ElementHandle<HTMLImageElement>):Promise<void> {

	function writeBuffer(res:string):void {
		if (res) {
			const buf:Buffer = Buffer.from(res.replace('data:image/png;base64,', ''), 'base64');
			writeFile("output.png", buf)
			.then(() => {
				console.log('Buffer has been written to file successfully');
			})
		}
	}

	return captchaImageContainer.evaluate((el:HTMLImageElement) => el.src)
	.then(writeBuffer)
}