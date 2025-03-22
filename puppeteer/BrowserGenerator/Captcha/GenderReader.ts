import { Page, Browser, ElementHandle, JSHandle } from 'puppeteer';
import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass';
import { readFile } from 'node:fs/promises';;

export default class GenderReader {

	page:Promise<Page>;

	constructor(tab:Promise<Page>) {
		this.page = tab
	}

	async readText():Promise<string> {
		let page = await this.page;
		const textElement:ElementHandle|null = await page.$('div.v-captcha-input > label');
		if (!textElement) {throw "Gender text not found"}
		else {
			let jsh:JSHandle<unknown> | undefined = await textElement?.getProperty('textContent');
			let value:unknown =  await jsh?.jsonValue();
			return <string>value;
		}
	}

	async checkIfMaleOrFemale():Promise<string> {
		const text = await this.readText()
		switch (true) {
			case text.includes('męskie'):
				return	readFile('fNames.csv', { encoding: 'utf8' });
			break;
			case text.includes('żeńskie'):
				return	readFile('fNames.csv', { encoding: 'utf8' });
			break;
			default: throw "Word -zenski- or -meski- not found"
		}
	}
}

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let cs:GenderReader = new GenderReader(tab);

function strRep(inp:string):string {
	return inp.replaceAll(`"`, '').replaceAll(",", '')
}

Promise.all([cs.checkIfMaleOrFemale(), br])
.then((arr:[string, Browser]) => {console.log(strRep(arr[0])); arr[1].disconnect()})