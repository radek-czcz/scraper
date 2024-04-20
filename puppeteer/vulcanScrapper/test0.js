const { spawn } = require('child_process');

const child = spawn('node', ['test1.js'],{
			stdio: ['pipe', 'pipe', 'pipe', 'ipc']
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
		// console.log('child: ');
		// console.dir(child. stdin, {depth: 0});
		child.stdin.write('abc')
		child.send('message from father')