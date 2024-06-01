const { spawn } = require('child_process');


let child = spawn("cmd", [], {
	cwd: process.cwd(),
	shell: true,
	detached: true,
	stdio: 'pipe'
});

// child.stdout.pipe(process.stdout);
child.stdout.on('data', inp => console.log(inp.toString()));