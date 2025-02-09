import { argv } from 'node:process';
import {JSONArray} from 'puppeteer';
import { readFile } from 'node:fs/promises';

export class CookiesFilesReader {
	private local:string
	private session:string
	private pathArg:string
	private pathToCookies:string

	constructor(local:string, session:string) {
		this.local = local;
		this.session = session;
		this.pathArg = this.getCommandLineArgs().path
		this.pathToCookies = this.pathArg ? this.pathArg : '../ConfigFiles/vulcan/cookies.json'
	}

	private getCommandLineArgs() {
		let ob:{[key: string]: string} = {}
		argv.forEach((inp, index) => {
			if (inp.split("=").length === 2) ob[inp.split("=")[0]] = inp.split("=")[1]
			else ob[index] = inp
		})
		return ob;
	}

	private getLocalStorage():Promise<JSONArray> {
		const localStorageString:Promise<Buffer> = readFile(this.local);
		return localStorageString.then((res:Buffer) => JSON.parse(res.toString()));
	}

	private getSessionStorage():Promise<JSONArray> {
		const sessStorageString:Promise<Buffer> = readFile(this.session);
		return sessStorageString.then((res:Buffer) => JSON.parse(res.toString()));
	}

	getCookies():Promise<void> {
		return new Promise ((res1, rej) => fs.readFile(pathToCookies, function(err, data) {
			if(err) {
				console.log('reading cookies file failed');
				throw err;
			}
			cookies = JSON.parse(data.toString());
			res1()
		}))
	}
}

let reader = new CookiesFilesReader("../../ConfigFiles/vulcan/local.json", "../../ConfigFiles/vulcan/session.json")
reader.getLocalStorage().then((res:JSONArray) => console.log(res))

