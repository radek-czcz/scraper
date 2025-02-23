import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { ExistingBrowserSubClass } from "../puppeteer/BrowserGenerator/ExistingBrowserSubClass";
import { Browser } from 'puppeteer';
import "jasmine";

xdescribe('This suite should test ExistingBrowserSubClass\n', function() {
	xit("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", async function() {
		let br2 = new ExistingBrowserSubClass();
		let br = await br2.launchBrowser()
		expect('pages' in br && 'wsEndpoint' in br).toBeTrue();
	})
})