import { getBrowserFromParentProcess, getPage, writerDB } from './index.mjs';
import log from 'why-is-node-running';

// 1. GET PLAN DETAILS AS HTML OUTER ELEMENT
export default function connectToExistingInstance() {
	let browser;
	getBrowserFromParentProcess()
	.then((res) => {
		let bPlan;
		let hPlan;
		let exams;
		
		browser = res;

		let pagePromise = getPage()
		.catch(err => console.log('getPage() function failed: ', err));

		let getHtmlString = pagePromise
		.then(async (res, reject) => {
			let examsPromise2;
			let hPlanPromise;
			let bPlanPromise;
			let examsPromise;
			let plan;
			// await res.reload();
			function rejected(result) {console.error('rej1: ', result); throw result;}
			function resolved(result) {console.log('res1: ', result); return result}
			let selectorNo1 = await res.$('div.css-1d90tha').then(res => res !== null)
			if (selectorNo1) {
				console.log('getting offers');
				return examsPromise = res.$$eval('div.css-1venxj6', divs => divs.map(function(inp) {
					function getPrice() { let str = inp.querySelector('p.css-tyui9s.er34gjf0').textContent; 
						str = str.replace(' ', '').replace(' zł', '')
						return str.endsWith('do negocjacji') ? str.replace('do negocjacji', '') : str };
					function getYearAndMileage() { return inp.querySelector('span.css-efx9z5').textContent }
					function getYear() { return getYearAndMileage().split(' - ')[0] }
					function getMileage() { return parseInt(getYearAndMileage().split(' - ')[1].replace(' km', '')) }
					function getCityAndDate() { return inp.querySelector('p.css-1a4brun.er34gjf0').textContent }
					function getCity() { return getCityAndDate().split(' - ')[0] }
					function getDate() {  return getCityAndDate().split(' - ')[1]  }
					function getDescription() { return inp.querySelector('h6.css-16v5mdi.er34gjf0').textContent }
					function getBrand() { return getDescription().toLowerCase().includes('toyota') ? 'Toyota' : null}
					function getModel() { return getDescription().toLowerCase().includes('avensis') ? 'Avensis' : null}
					function GFG_Fun() { let date = new Date(); return date.toISOString().slice(0, 19).replace('T', ' ') }
					return {
						price: getPrice(),
						prodYear: getYear(),
						mileage: getMileage(),
						city: getCity(),
						offerDate: getDate(),
						descr: getDescription(),
						brand: getBrand(),
						model: getModel(),
						fetchDate: GFG_Fun()
					}
				}))
				.catch(err => {
					console.log(err);
					Promise.reject(new Error("offers could not be found"))
				});
			} else throw 'user must log in again';
		})
		let writeToDB = getHtmlString
		.then((res) => {
			browser.disconnect()
			// console.log('res3: \n', res);
			console.log('writing to db');
			for (let nth=5; nth<=6/*res.length-1*/; nth++) {
				writerDB(res[nth]);
			}
			// writerDB(res[4]);
		})
		.catch(err => {
			if (err.toString().includes('user must log in again'))
			{process.stdout.write('user must log in again')}
			browser.disconnect();
		})
	})}

connectToExistingInstance();