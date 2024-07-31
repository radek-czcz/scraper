import {spawn, ChildProcess} from 'node:child_process';
import {cookiesConfig, attachFunc} from '../index';

export default function saveCookies():void {
		let processOfSavingCookies:ChildProcess;
		let config = cookiesConfig;

		processOfSavingCookies = spawn('ts-node', [
			// Relative path to fetcher's module's file
			config.fetcherRelativePath, 
			'cookiesPath='+config.pathToCookies
		], {shell: true})
		let name1 = 'fetching cookies';

		attachFunc({
			processObject: processOfSavingCookies,
			name: name1,
		})
}