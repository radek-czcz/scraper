import { readFile } from 'node:fs/promises';
import {Gender} from './GenderReader';
import stringFunction from './NamesFileProcessFunction';
import {autoInjectable, inject} from 'tsyringe';
import GenderReader from './GenderReader';


@autoInjectable()
export class NamesFileReader {

	constructor(
		private _genReader:GenderReader
	) {/*console.log(this)*/}

	async readFile():Promise<ReturnType<typeof stringFunction>> {
		const gender:Gender = await this._genReader.gender;
		// console.log('NamesFileReader', this);
		// console.log(Gender[gender]);
		switch (true) {
			case gender===Gender.Male:
				return	readFile('../BrowserGenerator/Captcha/mNames.csv', { encoding: 'utf8' })
				.then((res:string) => stringFunction(res));
			break;
			case gender===Gender.Female:
				return	readFile('../BrowserGenerator/Captcha/fNames.csv', { encoding: 'utf8' })
				.then((res:string) => stringFunction(res));
			break;
			default: throw "Word -zenski- or -meski- not found"
		}
	}
}