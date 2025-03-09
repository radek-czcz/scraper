import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Browser, Page } from 'puppeteer';
import "jasmine";
import net, {Server, Socket} from 'net';
import beforeSetup from './Before.spec'

describe('This suite should test BrowserSubClass\n', function(this:any) {

	beforeAll(beforeSetup)

	function browserExpectation(this:any) {
		expect('pages' in this.br && 'wsEndpoint' in this.br).toBeTrue();
	}

	it("Function launchBrowser() should return object with properties 'pages' and 'wsEndpoint'", browserExpectation)

})