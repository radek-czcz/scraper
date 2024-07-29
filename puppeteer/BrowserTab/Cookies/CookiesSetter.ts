import {spawn, ChildProcess} from 'node:child_process';
import allTabs, {cookiesConfig, attachFunc} from '../index';

export default function cookiesSet() {allTabs.then(async () => {
	let config = await cookiesConfig/*()*/;
	let processToSetCookies:ChildProcess;
	processToSetCookies = spawn('ts-node', [config.setterRelativePath, 'path='+config.pathToCookies], {shell: true});
	let name1 = 'Cookies setting';
	attachFunc({
		processObject: processToSetCookies,
		name: name1,
		onData: function(data:string) {
			if ( data.toString().includes('cookies set') ) {
				console.log('resolving');
				resolver();
			}
			console.log(`Process of ${name1} produced output:\n  ${data}`);
		}
	})
})}