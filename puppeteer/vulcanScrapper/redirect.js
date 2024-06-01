const fs = require('fs');
const { spawn } = require('child_process');


let writeS = fs.createWriteStream('yourfile.log');
// process.stdin.on('data', inp => process.stdout.write(inp));
process.stdin.on('data', inp => writeS.write(inp));


/*const lsProcess = spawn('dir');
lsProcess.stdout.pipe(logging);
lsProcess.stderr.pipe(logging);*/

/*lsProcess.on('close', code => {
  console.log(code);
});*/