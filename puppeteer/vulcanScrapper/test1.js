	// console.dir(process, {depth: 0})

	process.on('message', (data) => {
		console.log(`I got message from father:\n`, data.toString())
	})

	process.on('message', (data) => {
		console.log(`I got message from father:\n`, data.toString())
	})

	process.stdin.on('data', (data) => {
		console.log(`I got message from father:\n`, data.toString())
	})