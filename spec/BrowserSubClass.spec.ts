import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Browser } from 'puppeteer';
import "jasmine";

describe('suite should test BrowserSubClass', function() {
	it('Function launchBrowser() should return puppeteer.Browser instance', async function() {
		let br2 = new BrowserSubClass();
		let br = await br2.launchBrowser()
		expect(br instanceof typeof Browser).toBeTrue();
	})
})