import { Page } from 'puppeteer'

export default class LoginOperator {

	private page:Promise<Page>;
	private credentials:[string, string];
	private button:HTMLElement;

	constructor(page:Promise<Page>, credentials:[/*user*/string, /*password*/string], button:HTMLElement) {
		this.page = page
		this.credentials = credentials
		this.button = button;
	}

	writeLogin(selector:string) {

	}

	writePassword(selector:string) {

	}

	clickLogin() {

	}
}