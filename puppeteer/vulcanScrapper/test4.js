import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { spawn } from 'child_process';
import getTime from './RandomTimeInterval.js'
import process from 'node:process';
import attachFunc from './ProcessListenersManager.js'

let childProcessWriteLogingPassword;
let childProcessWriteDataToDB;
let intervalTimer;

function connectToExistingInstance() {
	let now1 = new Date();
	// const date1 = new Date('May 02, 2024 20:48:35');
	// const date2 = new Date('May 02, 2024 20:49:05');
	const date1 = new Date(now1.getTime() + 1000*14);
	const date2 = new Date(now1.getTime() + 1000*75);
	let waittime1 = date1.getTime() - now1.getTime();
	let waittime2 = date2.getTime() - now1.getTime();

	let spawnWrapFunction = function() {
		let processOfFetchAndWriteInner;
		processOfFetchAndWriteInner = spawn('npx', ['babel-node', 'continuation2'], {shell: true})
		let name1 = 'fetching data & writing data';
		attachFunc({
			processObject: processOfFetchAndWriteInner,
			onClose: function(code) {
				console.log(`Process of ${name1} has ended with code:${code}`);
				function spawning() {
					console.log(`Process of ${name1}: Starting new process`)
					let process1 = spawn('npx', ['babel-node', 'continuation2'], {shell: true});
					spawnWrapFunction()
				}
				setTimeout(spawnWrapFunction, getTime((1/30), ((1/55)*(1/10))))
			},
			name: name1,
		})
	}

	getBrowserFromParentProcess()
	.then(() => {
		console.log("Writing To DB: Starting new cyclic process")
		setTimeout(spawnWrapFunction, waittime1);
		console.log(`it's ${waittime1/(1000*60*60)} hours left to run`)
		setTimeout(spawnWrapFunction, waittime2);
		console.log(`it's ${waittime2/(1000*60*60)} hours left to run`)
	})
}

connectToExistingInstance();