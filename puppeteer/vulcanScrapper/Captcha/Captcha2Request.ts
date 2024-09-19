import credentials from './Captcha2Credentials'
// import { readFileSync } from 'node:fs';
import {Solver} from "@2captcha/captcha-solver"
import names from './names'

// const solver = new Solver(credentials.apiKey)

// let file1:Function = () => {return readFileSync("cap.jpg", "base64")}

// solver.imageCaptcha({
//     body: file1(),
// })
// .then(res => {
// 	console.log(res);
// 	let words:string[] = res.split(' ');
// 	console.log(words);
// 	words.find((elem:string) => {
// 		names.forEach((name:string) => elem.includes(name))
// 	})
// })

// let words:string[] = ['radek64892', 'anna3505']
// console.log(words.find((elem:string) => {
// 	return names.find((name:string) => elem.includes(name.toLowerCase()))
// }))

export default function solveCaptcha(image:Promise<string|Buffer>) {
	const solver = new Solver(credentials.apiKey);
	image.then((res:string|Buffer) => {
		let str:string;
		typeof res != 'string' ? str = res.toString() : str = res
		return solver.imageCaptcha({
		    body: str,
		    phrase: 1,
		    lang: 'pl'
		    // numeric: 4,
		    // min_len: 5,
		    // max_len: 5
		})
	})
	.then(res => {
		console.log(res);
		let words:string[] = res.data.split(' ');
		console.log(words);
		console.log(words.find((elem:string) => {
			return names.find((name:string) => elem.includes(name.toLowerCase()))
		}))
	})
}
