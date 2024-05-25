export default function attachListeners(processObj:ChildProcess) {

	const {processObject, name, onData, onErrData, onError, onClose} = processObj;
	
	let onDataCallback:void = function(data:string) {
		console.log(`Process of ${processObj.name} produced output:\n  ${data}`);
	}
	let onErrorDataCallback:void = function(data:Error) {
		console.error(`Process of ${processObj.name}: error has occured:\n  ${data}`);
	}
	let onErrorCallback:void = function(error:Error) {
		console.error(`Process of ${processObj.name}: error has occured:\n  ${error.message}`);
	}
	let onCloseCallback:void = function(code:number) {
		console.log(`Process of ${processObj.name} has ended with code:${code}`);
	}

	let spawnWrapFunction = function(processObj1:ChildProcess) {
		processObject.stdout.on('data', onData ? onData : onDataCallback);
		processObject.stderr.on('data', onErrData ? onErrData : onErrorDataCallback);
		processObject.on('error', onError ? onError : onErrorCallback);
		processObject.on('close', onClose ? onClose : onCloseCallback)
	}

	spawnWrapFunction(processObj);
}