import { getBrowserFromParentProcess, getPage } from './index.mjs';
import { writerDB } from './index.mjs';
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
				// return examsPromise = res.$$eval('div.css-1venxj6', divs => divs.map(inp => inp.textContent))
				return examsPromise = res.$$eval('div.css-1venxj6', divs => divs.map(function(inp) {
					function getPrice() { return inp.querySelector('p.css-tyui9s.er34gjf0').textContent };
					function getYearAndMileage() { return inp.querySelector('span.css-efx9z5').textContent }
					function getYear() { return getYearAndMileage().split(' - ')[0] }
					function getMileage() { return getYearAndMileage().split(' - ')[1] }
					return {
						price: getPrice(),
						year: getYear(),
						mileage: getMileage()
					}
				}))
				.catch(err => {
					console.log(err);
					Promise.reject(new Error("offers could not be found"))
				});
				/*plan = res.$$eval('div.panel.plan > div.subDiv.pCont > div', res => res.map(inp => inp.outerHTML))
				.then(res => res.length===0 ? Promise.reject(new Error("empty eval, plan could not be found")) : res)
				hPlanPromise = plan.then(res => res[0] ? hPlan = res[0] : null, rejected);
				bPlanPromise = plan.then(res => res[1] ? bPlan = res[1] : null, rejected);
				examsPromise2 = examsPromise.then( res => exams = res, rejected);
				let allPromises = Promise.allSettled( [ hPlanPromise, bPlanPromise, examsPromise2 ] ).then((res) => {
					// console.log('hPlanPromise: \n', hPlanPromise, '\n', 'bPlanPromise: \n', bPlanPromise, '\n', 'examsPromise2: \n', examsPromise2)
					console.log('res2: \n');
					res.forEach(elem => console.log(elem.status))
					let retVal = res.filter(inp => inp.status === 'fulfilled')
	
					return retVal.length === 0 ? Promise.reject("no promise fulfilled") : Promise.resolve(retVal);
				})
				return allPromises;*/
			} else throw 'user must log in again';
		})
		let writeToDB = getHtmlString
		.then((res) => {
			browser.disconnect()
			console.log('res3: \n', res);
			console.log('writing to db');
			let objToDB = {}
			exams ? objToDB.exams = exams: null;
			hPlan ? objToDB.hPlan = hPlan: null;
			bPlan ? objToDB.bPlan = bPlan: null;
			main(/*[exams, hPlan, bPlan]*/objToDB);
		})
		.catch(err => {
			if (err.toString().includes('user must log in again'))
			{process.stdout.write('user must log in again')}
			browser.disconnect();
		})
	})}

connectToExistingInstance();