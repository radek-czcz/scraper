	

export default function attachListeners(processObj) {

	const {processObject, name, oc} = processObj;
	
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
	let ocl = oc ? oc : onCloseCallback
	let spawnWrapFunction = function(processObj1) {
		processObj1.processObject.stdout.on('data', onDataCallback);
		processObj1.processObject.stderr.on('data', onErrorDataCallback);
		processObj1.processObject.on('error', onErrorCallback);
		processObj1.processObject.on('close', ocl)
	}

	spawnWrapFunction(processObj);
}