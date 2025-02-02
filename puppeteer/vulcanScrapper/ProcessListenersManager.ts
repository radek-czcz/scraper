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

// This function enables easy way to provide custom handlers and name for the ChildProcess.
// To do this, there must be provided an object compatible with SubProcess interface.
// Name property of this object is utulized in logging functions.
export default function attachListeners(processObj:SubProcess) {

	// destructure function argument
	const {processObject, name, onData, onErrData, onError, onClose} = processObj;

	// default handlers. They work, when destructured argument includes no handlers.
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

	// function attaching handlers. If destructured argument includes some handlers,
	// they are going to be attached.
	let spawnWrapFunction = function(processObj1:SubProcess) {
		processObject.stdout?.on('data', onData ? onData : onDataCallback);
		processObject.stderr?.on('data', onErrData ? onErrData : onErrorDataCallback);
		processObject.on('error', onError ? onError : onErrorCallback);
		processObject.on('close', onClose ? onClose : onCloseCallback)
	}

	// execute attaching function.
	spawnWrapFunction(processObj);
}