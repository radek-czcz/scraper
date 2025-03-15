import {JSONArray} from 'puppeteer';
import { readFile } from 'node:fs/promises';

export default class StorageDataReader {

	localStoragePath:string;
	sessionStoragePath:string;

	constructor(inp:[/*local*/string, /*session*/string]) {
		[this.localStoragePath, this.sessionStoragePath] = inp;
	}

	private getStorageData(path:string):Promise<JSONArray> {
		const storageString:Promise<Buffer> = readFile(path);
		return storageString.then((res:Buffer) => JSON.parse(res.toString()));
	}

	private getLocalStorage():Promise<JSONArray> {
		return this.getStorageData(this.localStoragePath);
	}

	private getSessionStorage():Promise<JSONArray> {
		return this.getStorageData(this.sessionStoragePath);
	}

	public readStorageData():Promise<[JSONArray, JSONArray]> {
		return Promise.all([this.getLocalStorage(), this.getSessionStorage()])
	}

}

// new StorageDataReader(["../../ConfigFiles/vulcan/local.json", "../../ConfigFiles/vulcan/session.json"]).readStorageData().then(res => console.log(res))