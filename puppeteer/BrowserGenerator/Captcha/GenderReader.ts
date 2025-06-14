import { Page, Browser, ElementHandle, JSHandle } from 'puppeteer';
// import {ExistingBrowserSubClass} from '../ExistingBrowserSubClass';

export enum Gender {
	Male,
	Female
}

export default class GenderReader {

	private page:Promise<Page>;
	private gender_:Promise<Gender>;

	constructor(page:Promise<Page>) {
		this.page = page;
		this.gender_ = this.assignGender();
	}

	private async readText():Promise<string> {
		let page = await this.page;
		const textElement:ElementHandle|null = await page.$('div#captcha[style]:not([style="display: none;"]) div.v-captcha-input > label');
		if (!textElement) {throw new Error("Gender text not found")}
		else {
			let jsh:JSHandle<unknown> | undefined = await textElement?.getProperty('textContent');
			let value:unknown =  await jsh?.jsonValue();
			return <string>value;
		}
	}

	private async assignGender():Promise<Gender> {
		const text = await this.readText();
		switch (true) {
			case text.includes('męskie'):
				return Gender.Male;
			break;
			case text.includes('żeńskie'):
				return Gender.Female;
			break;
			default: throw "Word -zenski- or -meski- not found"
		}
	}

	public get gender() {
		return this.gender_;
	}
}

// let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

// let br:Promise<Browser> = ebs.browser

// let tab:Promise<Page> = br
// .then((browser:Browser) => browser.pages())
// .then((tabs:Page[]) => tabs[0]);

// let cs:GenderReader = new GenderReader(tab);

// function strRep(inp:string):string[] {
// 	return inp.replaceAll(`"`, '').replaceAll(",", '').split('\n')
// }

// Promise.all([GenderReader.readText(tab), br])
// .then((arr:[string, Browser]) => {
// 	console.log(arr[0]);
// 	arr[1].disconnect();
// })
