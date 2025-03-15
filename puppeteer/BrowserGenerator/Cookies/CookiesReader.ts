import { readFile } from 'node:fs/promises';
import { JSONArray } from 'puppeteer';
import fs from 'fs';

interface ErrnoException extends Error {
    errno?: number | undefined;
    code?: string | undefined;
    path?: string | undefined;
    syscall?: string | undefined;
}

export default class CookiesReader {
	public static getCookies(pathToCookies:string):Promise<JSONArray> {
		return new Promise ((res1, rej) => fs.readFile(pathToCookies, function(this:any, err:ErrnoException | null, data:Buffer) {
			if(err) {
				console.log('reading cookies file failed');
				throw err;
			}
			// this.cookies = JSON.parse(data.toString());
			res1(JSON.parse(data.toString()))
		}))
	}
}