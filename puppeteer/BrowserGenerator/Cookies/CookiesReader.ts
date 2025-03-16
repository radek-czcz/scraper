import { readFile } from 'node:fs/promises';
import { JSONArray } from 'puppeteer';
import fs from 'fs';

export default class CookiesReader {
	public static getCookies(pathToCookies:string):Promise<JSONArray> {
		return new Promise ((res1, rej) => fs.readFile(pathToCookies, function(this:any, err:NodeJS.ErrnoException | null, data:Buffer) {
			if(err) {
				console.log('reading cookies file failed');
				throw err;
			}
			// this.cookies = JSON.parse(data.toString());
			res1(JSON.parse(data.toString()))
		}))
	}
}