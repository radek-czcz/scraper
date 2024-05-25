import {spawn} from 'child_process';
import {getTime} from './index';
import process from 'node:process';
import {attachFunc} from './index';

function connectToExistingInstance() {
	let now1 = new Date();
	// const date1 = new Date('May 14, 2024 11:30:35');
	const date1 = new Date(now1.getTime() + 1000*4);

	function timeDifference(date1:Date, now1:Date):number  {
		return date1.getTime() - now1.getTime();
	}

	let spawnWrapFunction = function() {
		let processOfFetchAndWriteInner;

		processOfFetchAndWriteInner = spawn('ts-node', ['Fetching.ts'], {shell: true})
		let name1 = 'fetching data & writing data';
		processOfFetchAndWriteInner.on('uncaughtException', function(data){
			console.log(data.toString());
		})
		attachFunc({
			processObject: processOfFetchAndWriteInner,
			name: name1,
			onData: function(data:Buffer) {
				console.log(data.toString());
			},
			onClose: function(code:number) {
				console.log(`Process of ${name1} has ended with code:${code}`);
				let time = getTime(1/55, (1/65)*(1/10))
				setTimeout(spawnWrapFunction, time)
				console.log(`next fetch in ${time*(1/60)*(1*60)*(1/1000)} seconds`)
			},
		})
	}

	let waittime1 = timeDifference(date1, now1)
	console.log("Writing To DB: Starting new cyclic process")
	setTimeout(spawnWrapFunction, waittime1);
	console.log(`it's ${waittime1/(1000/**60*60*/)} seconds left to run`)
	console.log(`it's ${waittime1/(1000*60*60)} hours left to run`)
}

connectToExistingInstance();
