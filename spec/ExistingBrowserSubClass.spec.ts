import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { ExistingBrowserSubClass } from "../puppeteer/BrowserGenerator/ExistingBrowserSubClass";
import "jasmine";

xdescribe('This suite should test ExistingBrowserSubClass\n', function() {
	xit("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", async function(this:any) {
		this.br = await new BrowserSubClass()
		this.br2 = await new ExistingBrowserSubClass();
		this.br3 = await this.br2.launchBrowser()
		expect('pages' in this.br2 && 'wsEndpoint' in this.br2).toBeTrue();
	})
})