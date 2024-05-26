import { spawn, ChildProcess } from 'node:child_process';
import {stdout} from 'node:process'

export interface SubProcess {
	processObject:ChildProcess;
	name:string;
	onData?:Function;
	onErrData?:Function;
	onError?:Function;
	onClose?:Function;
}

export default function attachListeners(processObj:SubProcess) {

	const {processObject, name, onData, onErrData, onError, onClose} = processObj;
	
	let onDataCallback:any = function(data:string) {
		console.log(`Process of ${processObj.name} produced output:\n  ${data}`);
	}
	let onErrorDataCallback:any = function(data:Error) {
		console.error(`Process of ${processObj.name}: error has occured:\n  ${data}`);
	}
	let onErrorCallback:any = function(error:Error) {
		console.error(`Process of ${processObj.name}: error has occured:\n  ${error.message}`);
	}
	let onCloseCallback:any = function(code:number) {
		console.log(`Process of ${processObj.name} has ended with code:${code}`);
	}

	let spawnWrapFunction = function(processObj1:SubProcess) {
		processObject.stdout?.on('data', onData ? onData : onDataCallback);
		processObject.stderr?.on('data', onErrData ? onErrData : onErrorDataCallback);
		processObject.on('error', onError ? onError : onErrorCallback);
		processObject.on('close', onClose ? onClose : onCloseCallback)
	}

	spawnWrapFunction(processObj);
}