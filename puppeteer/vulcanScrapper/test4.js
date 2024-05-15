import { spawn } from 'child_process';
import getTime from './RandomTimeInterval.js'
import process from 'node:process';
import attachFunc from './ProcessListenersManager.js'

let childProcessWriteLogingPassword;
let childProcessWriteDataToDB;
let intervalTimer;
let parentProcessResolver;



function connectToExistingInstance() {
	let now1 = new Date();
	// const date1 = new Date('May 14, 2024 11:30:35');
	// const date2 = new Date('May 14, 2024 18:00:05');
	const date1 = new Date(now1.getTime() + 1000*4);
	const date2 = new Date(now1.getTime() + 1000*65);
	let waittime1 = date1.getTime() - now1.getTime();
	let waittime2 = date2.getTime() - now1.getTime();

	let spawnWrapFunction = function() {
		let processOfFetchAndWriteInner;

		processOfFetchAndWriteInner = spawn('npx', ['babel-node', 'continuation2'], {shell: true})
		let name1 = 'fetching data & writing data';
		processOfFetchAndWriteInner.on('uncaughtException', function(data){
			console.log(data.toString());
		})
		attachFunc({
			processObject: processOfFetchAndWriteInner,
			name: name1,
			onData: function(data) {
				console.log(data.toString());
			},
			onClose: function(code) {
				console.log(`Process of ${name1} has ended with code:${code}`);
				let time = getTime(1/55, (1/65)*(1/10))
				setTimeout(spawnWrapFunction, time)
				console.log(`next fetch in ${time*(1/60)*(1*60)} seconds`)
			},
		})
	}

	console.log("Writing To DB: Starting new cyclic process")
	setTimeout(spawnWrapFunction, waittime1);
	console.log(`it's ${waittime1/(1000*60*60)} hours left to run`)
	// setTimeout(spawnWrapFunction, waittime2);
	// console.log(`it's ${waittime2/(1000*60*60)} hours left to run`)
}

connectToExistingInstance();
