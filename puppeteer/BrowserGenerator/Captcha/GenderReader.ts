import { Page, Browser, ElementHandle, JSHandle } from 'puppeteer';
import {autoInjectable} from 'tsyringe';


export enum Gender {
	Male,
	Female
}

@autoInjectable()
export default class GenderReader {

	constructor(
		protected page:Promise<Page>,
	) {	}

	protected async readText():Promise<string> {
		let page = await this.page;
		const textElement:ElementHandle|null = await page.$('div#captcha[style]:not([style="display: none;"]) div.v-captcha-input > label');
		if (!textElement) {throw new Error("Gender text not found")}
		else {
			let jsh:JSHandle<unknown> | undefined = await textElement?.getProperty('textContent');
			let value:unknown =  await jsh?.jsonValue();
			return <string>value;
		}
	}

	protected async assignGender():Promise<Gender> {
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
		return this.assignGender();
	}
}