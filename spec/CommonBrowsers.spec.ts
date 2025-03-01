import { BrowserSubClass } from "../puppeteer/BrowserGenerator/BrowserSubClass";
import { Browser, Page } from 'puppeteer';
import "jasmine";
import net, {Server, Socket} from 'net';

class CommonBrowsers {

	private static bscVar:BrowserSubClass = new BrowserSubClass();

	static async bsc():Promise<BrowserSubClass> {
		return await this.bscVar
	}

	static async browser():Promise<Browser> {
		let bsc = await this.bscVar;
		return bsc.browser
	}
	
}

export default CommonBrowsers;

