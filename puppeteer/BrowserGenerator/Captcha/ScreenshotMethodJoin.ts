import { Browser, Page, ElementHandle } from 'puppeteer';
import { writeFile } from 'node:fs/promises';
import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass';

// reads base64 string from src of HTMLImageElement
function start() {

	function writeBuffer(res:string):Buffer {
		// if (res) {
			console.log('log: \n', res);
			const buf:Buffer = Buffer.from(res.replaceAll('data:image/png;base64,', ''), 'base64');
			writeFile("output.png", buf)
			.then(() => {
				console.log('Buffer has been written to file successfully');
			})
		// }
			return buf;
	}

	let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

	let br:Promise<Browser> = ebs.browser

	let tab:Promise<Page> = br
	.then((browser:Browser) => browser.pages())
	.then((tabs:Page[]) => tabs[0]);

	const captchaContainer:Promise<ElementHandle<HTMLImageElement>[]> = tab
		.then((tab:Page) => tab.$$('img.v-captcha-image'))
		.then((res:ElementHandle<HTMLImageElement>[]|null) => {
			if (!res) throw new Error('Selector not found')
			else return res;
	})

	const s1 = captchaContainer.then((els:ElementHandle<HTMLImageElement>[]) => els[0].evaluate((el:HTMLImageElement) => el.src))
	const s2 = captchaContainer.then((els:ElementHandle<HTMLImageElement>[]) => els[1].evaluate((el:HTMLImageElement) => el.src))

	// const s2 = captchaContainer[1].evaluate((el:HTMLImageElement) => el.src)


	Promise.all([s1, s2]).then((elss:[string,string]) => {elss.forEach(el => console.log('log: \n' + el));writeBuffer(elss[1] + elss[0].replace
		('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAYAAAA8AQ3AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAC', '')
	)})
	.finally(() => ebs.disconnectBrowser())


}

start()