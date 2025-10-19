import "reflect-metadata";
import {ExistingBrowserSubClass} from '../BrowserGenerator/ExistingBrowserSubClass';
import {autoInjectable} from 'tsyringe';

@autoInjectable()
export class Continuator<T> {
	constructor(
		protected _existing:ExistingBrowserSubClass,
	) {}

	get existing():ExistingBrowserSubClass {
		return this._existing;
	}

	resume():Promise<T> {
		return this._existing.tab0 as Promise<T>;
	}
}