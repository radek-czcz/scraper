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
	const date1 = new Date('May 14, 2024 11:30:35');
	const date2 = new Date('May 14, 2024 18:00:05');
	// const date1 = new Date(now1.getTime() + 1000*4);
	// const date2 = new Date(now1.getTime() + 1000*65);
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
			}
		})
	}
	spawnWrapFunction();
}

connectToExistingInstance();