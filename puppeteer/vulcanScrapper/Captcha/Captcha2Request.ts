import credentials from './Captcha2Credentials'
import { readFileSync } from 'node:fs';
import {Solver} from "@2captcha/captcha-solver"
import f_names from './names'
import m_names from './imionam';
// import {getGender2} from './ScreenshotForCaptcha';

class CaptchaRequest {
	image:Promise<string|Buffer>;
	gender:Promise<string | null>;

	constructor(image:Promise<string|Buffer>, gender:Promise<string | null>) {
		this.image = image;
		this.gender = gender;
	}
}

export default function solveCaptcha(
	image:Promise<string|Buffer>,
	gender:Promise<string | null>):Promise<string|undefined> {

	return sendRequest(image, gender)
	.then(chooseCorrectWord)

		/*const solver = new Solver(credentials.apiKey);
		image.then((res:string|Buffer) => {
			let str:string;
			typeof res != 'string' ? str = res.toString() : str = res
			return Promise.all([solver.imageCaptcha({
			    body: str,
			    phrase: 1,
			    lang: 'pl'
			    // numeric: 4,
			    // min_len: 5,
			    // max_len: 5
			}), gender])
		})
		.then(res => {
			console.log(res);
			let words:string[] = res[0].data.split(' ');
			console.log(words);

			let nameGender:string[];
			// res[1].then((val:string | null) => {
				// if (typeof val === 'string')
				if (typeof res[1] === 'string') {
				switch (true) {
					case res[1].includes('męskie'): nameGender = m_names; break;
					case res[1].includes('żeńskie'): nameGender = f_names; break;
				}
				console.log(words.find((elem:string) => {
					return nameGender.find((name:string) => elem.includes(name.toLowerCase()))
				}))}
			// })
		})*/
}

function sendRequest(image:Promise<string|Buffer>, gender:Promise<string | null>):Promise<[{}, string | null]> {
	return image.then((res:string|Buffer) => {
		const solver = new Solver(credentials.apiKey);
		let str:string;
		typeof res != 'string' ? str = res.toString() : str = res
		return Promise.all([solver.imageCaptcha({
		    body: str,
		    phrase: 1,
		    lang: 'pl'
		    // numeric: 4,
		    // min_len: 5,
		    // max_len: 5
		}), gender])
	})
}

function chooseCorrectWord(solvedCaptcha:[{}, string | null]):string|undefined { 
	console.log(solvedCaptcha);
	let words:string[] = (<any>solvedCaptcha[0]).data.split(' ');
	console.log(words);

	let nameGender:string[];
	if (typeof solvedCaptcha[1] === 'string') {
		switch (true) {
			case solvedCaptcha[1].includes('męskie'): nameGender = m_names; break;
			case solvedCaptcha[1].includes('żeńskie'): nameGender = f_names; break;
		}
	}
	return words.find((elem:string) => {
		return nameGender.find((name:string) => elem.includes(name.toLowerCase()))
	})
}