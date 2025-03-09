import { ExistingBrowserSubClass } from "../puppeteer/BrowserGenerator/ExistingBrowserSubClass";
import "jasmine";
import beforeSetup, {pr} from './Before.spec'
// import {pr} from './Before.spec'

describe('This suite should test ExistingBrowserSubClass\n', function() {

	// beforeAll(beforeSetup)

	it("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", async function(this:any) {
		let br2 = await new ExistingBrowserSubClass();
		pr.then(async res => {
			let br = await br2.launchBrowser()
			return expect('pages' in br && 'wsEndpoint' in br).toBeTrue();
		})
	})
})