import { Page, ElementHandle, JSHandle } from 'puppeteer';
import {container, autoInjectable, inject} from 'tsyringe';
import GenderReader from './GenderReader';
import {Gender} from './GenderReader';
import {ISelectorFinder} from '../LoginOperator/ISelectorFinder';
import {IFilePathProvider} from './IFilePathProvider';

class Registrator{
	constructor(
	) {container.register('selector', {useValue:'div#captcha[style]:not([style="display: none;"]) div.v-captcha-input > label'})}
}

@autoInjectable()
export default class GenderReader2 extends GenderReader implements IFilePathProvider {

	constructor(
		private reg:Registrator,
		protected page:Promise<Page>,
		@inject('sel-finder-gender') private selFinder:ISelectorFinder,
	) {super(page)}

	protected async readText():Promise<string> {
		const elem:ElementHandle/*<HTMLLabelElement>*/ = await this.selFinder.findElement();
		let jsh:JSHandle<unknown> | undefined = await elem.getProperty('textContent');
		let value:unknown =  await jsh?.jsonValue();
		return <string>value;
	}

	get filePath():Promise<string> {
		const gender:Promise<Gender> = this.assignGender()
		return gender
		.then((gen:Gender) => {
			switch (true) {
				case gen===Gender.Male:
					// return	readFile('../BrowserGenerator/Captcha/mNames.csv', { encoding: 'utf8' })
					return	'../BrowserGenerator/Captcha/mNames.csv';
					// .then((res:string) => stringFunction(res));
				break;
				case gen===Gender.Female:
					// return	readFile('../BrowserGenerator/Captcha/fNames.csv', { encoding: 'utf8' })
					return	'../BrowserGenerator/Captcha/fNames.csv';
					// .then((res:string) => stringFunction(res));
				break;
				default: throw "Word -zenski- or -meski- not found"
			}
		})
	}
}