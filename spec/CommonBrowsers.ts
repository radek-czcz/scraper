import {BrowserSubClass} from '../puppeteer/BrowserGenerator/BrowserSubClass'

export default class CommonBrowsers {

	static br:BrowserSubClass = new BrowserSubClass();

	public static bsc() {
		return CommonBrowsers.br
	}

	public static async browser() {
		return await CommonBrowsers.br.browser
	}
}