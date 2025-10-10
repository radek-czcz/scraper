import { ElementHandle } from 'puppeteer'
import { writeFile } from 'node:fs/promises';
import {autoInjectable, inject} from 'tsyringe';
import {IScreenshotMethod} from './IScreenshotMethod';
import {Buffer as Buf} from 'node:buffer'

// reads base64 string from src of HTMLImageElement
@autoInjectable()
export class ScreenshotMethod2/*<Buf>*/ implements IScreenshotMethod<Buf>/*<T>*/{

	constructor(
		private path:string,
		private captchaImageContainer:ElementHandle<HTMLImageElement>
	){/*console.log(Buffer);console.log(Buf);console.log(Buffer === Buf)*/}

	writeBuffer(res:string):Buf {
		const buf/*:Buf */= Buf.from(res.replace('data:image/png;base64,', ''), 'base64');
		console.log(buf);
		writeFile(this.path, buf)
		.then(() => {
			console.log('Buffer has been written to file successfully');
		})
		return buf;
	}

	makeScreenshot():Promise<Buf> {
		return this.captchaImageContainer.evaluate((el:HTMLImageElement) => el.src)
		.then(() => this.writeBuffer(this.path))
	}
}