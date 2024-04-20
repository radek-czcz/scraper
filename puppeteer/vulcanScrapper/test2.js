const log = require('why-is-node-running');
// process.stdin.on('data', inp => console.log(inp.toString().toUpperCase()))
process.stdin.on('data', inp => {
	process.stdout.write(inp);
	
})

setTimeout(() => process.stdin = null, 10000);
setTimeout(() => log(), 12000);
// process.stdout.on('data', inp => console.log('out: ', inp.toString()))
