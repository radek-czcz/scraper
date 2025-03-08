import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Navigator } from "../puppeteer/BrowserGenerator/Navigator";
import { Page } from 'puppeteer';
import "jasmine";

describe('This class should navigate the tab to new url', function() {
	beforeAll(async function(this:any){
		this.url = 'www.google.com'
		this.br2 = await new BrowserSubClass();
		this.br = await this.br2.browser
		this.page = this.br.pages().then((pages:Page[]) => pages[0])
		this.nav = new Navigator(this.page)
		this.func = this.nav.goToPage.bind(this.nav, this.url)
	})

	it('Function should navigate the tab to url', function(this:any) {
		this.func().then((p:Page) => {
			let funcRef = () => expect(p.url()).toContain(/*this.url*/'ase');
			setTimeout(funcRef, 3000)
		})
	})
})
