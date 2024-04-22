// const { spawn } = require('child_process');
import { spawn } from 'child_process';

console.log(process.env.PATH)

const child = spawn('npx', ['babel-node', 'test1'], { 
			shell: true
			// stdio: ['pipe', 'pipe', 'pipe', 'ipc']
		})

		child.stdout.on('data', (data) => {
		  console.log(`stdout:\n${data}`);
		});

		child.stderr.on('data', (data) => {
		  console.error(`stderr: ${data}`);
		});

		child.on('error', (error) => {
		  console.error(`error: ${error.message}`);
		});

		child.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);
		});

		process.stdin.on('data', (data) => child.stdin.write(data))

		// child.stdin.write('abc')
		// child.send('message from father')