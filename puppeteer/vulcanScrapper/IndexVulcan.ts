import {BrowserSubClass} from '../BrowserGenerator/BrowserSubClass';
import {injectable, inject} from 'tsyringe';

@injectable()
export class IndexVulcan {
	constructor(
		@inject(Symbol.for('firstBrowserSymbol')) protected brSubClass:BrowserSubClass,
	) {this.brSubClass.establishNetServer()}

	get bsc():BrowserSubClass {
		return this.brSubClass
	}
}