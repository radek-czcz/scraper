import {Page, PuppeteerLifeCycleEvent} from 'puppeteer';
import {inject, autoInjectable} from 'tsyringe';

@autoInjectable()
export class Navigator {

	constructor(
		private page:Promise<Page>,
		@inject('nav-time') private timeout:PuppeteerLifeCycleEvent,
		@inject('nav-destination') private destinationUrl:string,
	) {}

	public goToPage():Promise<Page> {
		return this.page.then((page:Page) => 
		  page.goto(this.destinationUrl, {waitUntil: this.timeout})
		  .then(() => {console.log('navigate: success'); return page})
		  .catch(err => {
		  	console.log(`browser could not navigate to the page address\n${err}`);
		  	throw err;
		  })
		)
	}
}