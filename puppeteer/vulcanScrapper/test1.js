// const fs = require('fs')
import fs from 'fs'

	process.on('message', (data) => {
		console.log(`I got message from father:\n`, data.toString())
	})

	process.on('message', (data) => {
		console.log(`I got message from father:\n`, data.toString())
	})

	process.stdin.on('data', (data) => {
		console.log(`	XI got message from father:\n	`, data.toString())
		process.stdout.write(`-${data}-`);
		
		// console.log(rd);
		
	})