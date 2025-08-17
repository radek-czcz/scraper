import {Page, PuppeteerLifeCycleEvent} from 'puppeteer';
import {inject, autoInjectable} from 'tsyringe';

@autoInjectable()
export class Navigator {

	constructor(
		private page:Promise<Page>,
		@inject('nav-time') private timeout:PuppeteerLifeCycleEvent
	) {}

	public goToPage(url:string):Promise<Page> {
		return this.page.then((page:Page) => 
		  page.goto(url, {waitUntil: this.timeout})
		  .then(() => {console.log('navigate: success'); return page})
		  .catch(err => {
		  	console.log(`browser could not navigate to the page address\n${err}`);
		  	throw err;
		  })
		)
	}
}