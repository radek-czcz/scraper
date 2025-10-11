import { ElementHandle } from 'puppeteer'
import { writeFile } from 'node:fs/promises';
import {autoInjectable, inject} from 'tsyringe';
import {IScreenshotMethod} from './IScreenshotMethod';
import {Buffer} from 'node:buffer'

// reads base64 string from src of HTMLImageElement
@autoInjectable()
export class ScreenshotMethod2/*<Buffer>*/ implements IScreenshotMethod<Buffer>/*<T>*/{

	constructor(
		@inject('captcha-path') private path:string,
		@inject('captcha-elHandle') private captchaImageContainer:ElementHandle<HTMLImageElement>
	){}

	private writeBuffer(res:string):Buffer {
		const buf:Buffer = Buffer.from(res.replace('data:image/png;base64,', ''), 'base64'/*'binary'*/);
		writeFile(this.path, buf)
		.then(() => {
			console.log('Buffer has been written to file successfully');
		})
		return buf;
	}

	makeScreenshot():Promise<Buffer> {
		return this.captchaImageContainer.evaluate((el:HTMLImageElement) => el.src)
		.then((buf:string) => this.writeBuffer(buf))
	}
}