import {autoInjectable, inject} from 'tsyringe';
import {Page, ElementHandle} from 'puppeteer';
import {ISelectorFinder} from './ISelectorFinder'

@autoInjectable()
export class InputBoxWriter {

	constructor(
		private page:Promise<Page>, 
		@inject('selector-inputbox') private _selector:string,
		@inject('sel-finder') private selFinder:ISelectorFinder,
		@inject('credentials') private credentials:[/*user*/string, /*password*/string],
	) {}

	writeToInputbox(select:0|1):Promise<void> {
		return this.selFinder.findElement()
		.catch((err:Error) => {console.log(`\n\nElement ` + this._selector + ` has not been found`); return Promise.reject(err)})
		.then((el:ElementHandle<HTMLInputElement>) => {console.log(this.credentials[0]);return el.type(this.credentials[select], {delay:80})})
	}

	set selector(inp:string) {
		this.selFinder.selector = inp;
	}
}