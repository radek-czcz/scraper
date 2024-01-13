// import * as fs from 'fs';
let musicDirectory = './music/';

/*function abc() {
	// let asy = function() {
		return new Promise((res, rej) => setTimeout(() => {console.log('end'); res("radek")}, 1000))
	// }
	// return asy;
	// return asy().then((res) => console.log(res));
}*/

function abc2() {
        fs.readdir(musicDirectory+'/'+'Nowy folder (2)', (err, files) => {
        	let arr = files.sort(() => (Math.random() > .5) ? 1 : -1);
        	console.log(files);
        })
}

function dateGen() {
	let date = new Date();
	console.log(date);
}

dateGen();