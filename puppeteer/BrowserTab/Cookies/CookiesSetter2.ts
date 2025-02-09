import fs from 'fs';
import {Browser, Page, JSONArray} from 'puppeteer';
import { argv } from 'node:process';
import { writeFile, readFile } from 'node:fs/promises';

export class CookiesSetter2 {
	private page:Promise<Page>

	constructor(page:Promise<Page>) {
		this.page = page;
	}

	public setCookies() {

	}
}