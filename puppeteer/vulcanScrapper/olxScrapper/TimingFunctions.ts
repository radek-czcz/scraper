import { spawn, ChildProcess } from 'node:child_process';
import {getTime} from './index';
// import {ChildProcess} from 'node:process';
import {attachFunc} from './index';

export default function startTimer():void {
	let now1:Date = new Date();
	// const date1 = new Date('May 14, 2024 11:30:35');
	const date1:Date = new Date(now1.getTime() + 1000*4);

	function timeDifference(date1:Date, now1:Date):number  {
		return date1.getTime() - now1.getTime();
	}

	// let spawnWrapFunction = function() {
	function spawnWrapFunction() {
		let processOfFetchAndWriteInner:ChildProcess;
		processOfFetchAndWriteInner = spawn('ts-node', ['Fetching.ts'], {shell: true})
		let name1:string = 'fetching data & writing data';
		processOfFetchAndWriteInner.on('uncaughtException', function(data):void {
			console.log(data.toString());
		})
		attachFunc({
			processObject: processOfFetchAndWriteInner,
			name: name1,
			onClose: function(code:number):void {
				console.log(`Process of ${name1} has ended with code:${code}`);
				let time = getTime(1/55, (1/65)*(1/10))
				// setTimeout(spawnWrapFunction, time)
				console.log(`next fetch in ${time*(1/60)*(1*60)*(1/1000)} seconds`)
			},
			onErrData: function(err:Error):void {
				console.log(`Error in ${name1} ocurred\n`);
				console.error(err);
				let time = getTime(1/55, (1/65)*(1/10))
				// setTimeout(spawnWrapFunction, time)
				console.log(`next fetch in ${time*(1/60)*(1*60)*(1/1000)} seconds`)
			}
		})
	}

	let waittime1:number = timeDifference(date1, now1)
	console.log("Writing To DB: Starting new cyclic process")
	setTimeout(spawnWrapFunction, waittime1);
	console.log(`it's ${waittime1/(1000/**60*60*/)} seconds left to run`)
	console.log(`it's ${waittime1/(1000*60*60)} hours left to run`)
}

// startTimer();
