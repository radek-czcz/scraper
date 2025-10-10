import {Solver} from "@2captcha/captcha-solver";
import {Gender} from './GenderReader';
import credentials from './Captcha2Credentials';
import {autoInjectable, inject} from 'tsyringe';

@autoInjectable()
export default class RequestSender {

	constructor(
		@inject('captcha-image') private image:Promise<string|Buffer>, 
		private gender:Promise<Gender>) { }

	// private chooseCorrectWord(solvedCaptcha:[{}, string | null]):string|undefined { 
	// 	console.log(solvedCaptcha);
	// 	let words:string[] = (<any>solvedCaptcha[0]).data.split(' ');
	// 	console.log(words);

	// 	let nameGender:string[];
	// 	if (typeof solvedCaptcha[1] === 'string') {
	// 		switch (true) {
	// 			case solvedCaptcha[1].includes('męskie'): nameGender = m_names; break;
	// 			case solvedCaptcha[1].includes('żeńskie'): nameGender = f_names; break;
	// 		}
	// 	}
	// 	return words.find((elem:string) => {
	// 		return nameGender.find((name:string) => elem.includes(name.toLowerCase()))
	// 	})
	// }

	sendRequest():Promise<{data:string}> {
		return this.image.then((res:string|Buffer) => {
			const solver = new Solver(credentials.apiKey);
			let str:string;
			typeof res != 'string' ? str = res.toString() : str = res
			return solver.imageCaptcha({
			    body: str,
			    // phrase: 1,
			    lang: 'pl'
			    // numeric: 4,
			    // min_len: 5,
			    // max_len: 5
			})
		})
	}

	// solveCaptcha():Promise<string|undefined> {
	// 	return sendRequest(this.image, this.gender)
	// 	.then(this.chooseCorrectWord)
	// }
}