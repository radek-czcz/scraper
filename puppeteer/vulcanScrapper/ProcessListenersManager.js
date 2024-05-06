	

export default function attachListeners(processObj) {

	const {processObject, name, onData, onErrData, onError, onClose} = processObj;
	
	let onDataCallback = function(data) {
		console.log(`Process of ${processObj.name} produced output:\n  ${data}`);
	}
	let onErrorDataCallback = function(data) {
		console.error(`Process of ${processObj.name}: error has occured:\n  ${data}`);
	}
	let onErrorCallback = function(error) {
		console.error(`Process of ${processObj.name}: error has occured:\n  ${error.message}`);
	}
	let onCloseCallback = function(code) {
		console.log(`Process of ${processObj.name} has ended with code:${code}`);
	}

	let spawnWrapFunction = function(processObj1) {
		processObject.stdout.on('data', onData ? onData : onDataCallback);
		processObject.stderr.on('data', onErrData ? onErrData : onErrorDataCallback);
		processObject.on('error', onError ? onError : onErrorCallback);
		processObject.on('close', onClose ? onClose : onCloseCallback)
	}

	spawnWrapFunction(processObj);
}