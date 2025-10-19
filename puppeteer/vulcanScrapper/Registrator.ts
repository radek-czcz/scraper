import {Page} from 'puppeteer';
import {container, autoInjectable} from 'tsyringe'
import {ExistingBrowserSubClass} from '../BrowserGenerator/ExistingBrowserSubClass';

@autoInjectable()
export class Registrator {
	constructor(
		private browser:ExistingBrowserSubClass
	) { 
		container.register(Promise<Page>, {useValue:this.browser.tab0});
	}
}