import { readFile } from 'node:fs/promises';
import {Gender} from './GenderReader';
import stringFunction from './NamesFileProcessFunction'

export default class NamesFileReader {
	static 	async readFile(genderInp:Promise<Gender>):Promise<ReturnType<typeof stringFunction>> {
		const gender = await genderInp;
		switch (true) {
			case gender===Gender.Male:
				return	readFile('./Captcha/mNames.csv', { encoding: 'utf8' })
				.then((res:string) => stringFunction(res));
			break;
			case gender===Gender.Female:
				return	readFile('./Captcha/fNames.csv', { encoding: 'utf8' })
				.then((res:string) => stringFunction(res));
			break;
			default: throw "Word -zenski- or -meski- not found"
		}
	}
}