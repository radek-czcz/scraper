import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { spawn } from 'child_process';
import getTime from './RandomTimeInterval.js'
import process from 'node:process';

let childProcessWriteLogingPassword;
let childProcessWriteDataToDB;
let intervalTimer;

function connectToExistingInstance() {
	const date1 = new Date('May 02, 2024 20:48:35');
	const date2 = new Date('May 02, 2024 20:49:05');
	let now = new Date();
	let waittime1 = date1.getTime() - now.getTime();
	let waittime2 = date2.getTime() - now.getTime();

	let spawnWrapFunction = function(processObj) {
		processObj.stdout.on('data', (data) => {
			console.log(`  Writing To DB: stdout:\n  ${data}`);});
		processObj.stderr.on('data', (data) => {
			console.error(`Writing To DB: error has occured:\n  ${data}`);});
		processObj.on('error', (error) => {
			console.error(`Writing To DB: error has occured:\n  ${error.message}`);});
		processObj.on('close', (code) => {
			console.log(`Writing To DB: Process has ended with code:${code}`);
			let spawning = () => {
			console.log("Writing To DB: Starting new process")
				let process1 = spawn('npx', ['babel-node', 'continuation2'], {shell: true});
				spawnWrapFunction(process1)}
			setTimeout(spawning, getTime((1/60), ((1/60)*(1/10))))})}

	getBrowserFromParentProcess()
	.then(() => {
		let spawning = function() {
			console.log("Writing To DB: Starting new process")
			let process1 = spawn('npx', ['babel-node', 'continuation2'], {shell: true});
			spawnWrapFunction(process1)}
		console.log("Writing To DB: Starting new cyclic process")
		setTimeout(spawning, waittime1);
		console.log(`it's ${waittime1/(1000*60*60)} hours left to run`)
		setTimeout(spawning, waittime2);
		console.log(`it's ${waittime2/(1000*60*60)} hours left to run`)})}

connectToExistingInstance();