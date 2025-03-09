import { ExistingBrowserSubClass } from "../puppeteer/BrowserGenerator/ExistingBrowserSubClass";
import "jasmine";
import {pr} from './Before.spec';

describe('This suite should test ExistingBrowserSubClass', function() {

	it("\nFunction launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", async function(this:any) {
		let br2 = await new ExistingBrowserSubClass();
		pr.then(async res => {
			let br = await br2.launchBrowser();
			return expect('pages' in br && 'wsEndpoint' in br).toBeTrue();
		})
	})
})
