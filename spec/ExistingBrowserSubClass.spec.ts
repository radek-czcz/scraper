import { ExistingBrowserSubClass } from "../puppeteer/BrowserGenerator/ExistingBrowserSubClass";
import "jasmine";
import beforeSetup from './Before.spec'

xdescribe('This suite should test ExistingBrowserSubClass\n', function() {

	beforeAll(beforeSetup)

	it("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", async function(this:any) {
		let br2 = await new ExistingBrowserSubClass();
		let br = await br2.launchBrowser()
		expect('pages' in br && 'wsEndpoint' in br).toBeTrue();
	})
})