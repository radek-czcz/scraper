import {Solver} from "@2captcha/captcha-solver";
import {Gender} from './GenderReader';
import credentials from './Captcha2Credentials';
import {autoInjectable, inject} from 'tsyringe';

@autoInjectable()
export default class RequestSender {

	constructor(
		@inject('captcha-image') private image:Promise<string|Buffer>, 
	) { }

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
}