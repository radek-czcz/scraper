import {Page} from 'puppeteer'

export class Navigator {
	private page:Promise<Page>;

	constructor(page:Promise<Page>) {
		this.page = page;
	}

	public goToPage(url:string):Promise<Page> {
		return this.page.then((page:Page) => {
		  page.goto(url, {waitUntil: 'networkidle2'})
		  .catch(err => console.log(`browser could not navigate to the page address\n${err}`));
		  return this.page
		})
	}
}